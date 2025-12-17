const { Client } = require('pg');
const c = new Client({
  connectionString: 'postgresql://neondb_owner:npg_4ePWMYjdcs8X@ep-shiny-paper-a9rkvl0g-pooler.gwc.azure.neon.tech/neondb?sslmode=require'
});

(async () => {
  await c.connect();
  const r = await c.query("SELECT column_name FROM information_schema.columns WHERE table_name = 'users'");
  console.log('Columns:', r.rows.map(row => row.column_name));
  await c.end();
})().catch(console.error);
