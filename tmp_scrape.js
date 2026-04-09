import https from 'https';

const videoIds = [
  'jH8pdCJBQH0',
  '9b-dV63mHBo',
  'ph4vPrZoBrE',
  '70Gpk0TvJkI',
  'TDsFAJrsZoo',
  'GvoVxxQgxs8',
  'PeskPCHajUw',
  'MdIhvHsl_Ho'
];

async function fetchMetadata(id) {
  return new Promise((resolve) => {
    https.get(`https://www.youtube.com/watch?v=${id}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        let title = '';
        let description = '';
        let date = '';
        
        const titleMatch = data.match(/<meta name="title" content="([^"]*)">/);
        if (titleMatch) title = titleMatch[1];
        
        const descMatch = data.match(/<meta name="description" content="([^"]*)">/);
        if (descMatch) description = descMatch[1];
        
        const dateMatch = data.match(/<meta itemprop="datePublished" content="([^"]*)">/);
        if (dateMatch) date = dateMatch[1];
        
        resolve({ id, title, description, date });
      });
    }).on('error', () => resolve({ id, title: 'Unknown', description: '', date: '' }));
  });
}

async function main() {
  const results = [];
  for (const id of videoIds) {
    results.push(await fetchMetadata(id));
  }
  console.log(JSON.stringify(results, null, 2));
}

main();
