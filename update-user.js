const { Client } = require('pg');
const c = new Client({
  connectionString: 'postgresql://neondb_owner:npg_4ePWMYjdcs8X@ep-shiny-paper-a9rkvl0g-pooler.gwc.azure.neon.tech/neondb?sslmode=require'
});

(async () => {
  await c.connect();
  const r = await c.query("UPDATE users SET plan = 'team' WHERE email = 'th.kiene@gmail.com' RETURNING id, email, plan");
  console.log('Updated:', r.rows);
  await c.end();
})().catch(console.error);
