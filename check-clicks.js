const { Client } = require('pg');
const c = new Client({
  connectionString: 'postgresql://neondb_owner:npg_4ePWMYjdcs8X@ep-shiny-paper-a9rkvl0g-pooler.gwc.azure.neon.tech/neondb?sslmode=require'
});

(async () => {
  await c.connect();
  const clicks = await c.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'clicks' ORDER BY ordinal_position");
  console.log('CLICKS TABLE:');
  clicks.rows.forEach(r => console.log(r.column_name + ': ' + r.data_type));
  const sample = await c.query('SELECT * FROM clicks LIMIT 2');
  console.log('\nSAMPLE DATA:', JSON.stringify(sample.rows, null, 2));
  await c.end();
})().catch(console.error);