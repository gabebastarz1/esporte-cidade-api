para rodar tem que iniciar o servidor com npm run dev e depois as migrations e a seed nessa ordem 
comandos 

npm run dev

npx ts-node -O '{\"module\":\"commonjs\"}' ./node_modules/typeorm/cli.js migration:run -d src/database/config.ts

npx ts-node src/seeds/seedAtendiments.ts


 a seed gera um athleta de teste para logar 
 cpf: 12345678900
 senha: 123456789

 Professor:
 