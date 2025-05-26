const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors()); 

// Lista de cidades americanas
const cidadesAmericanas = [
  "New York, NY, USA",
  "Los Angeles, CA, USA",
  "Chicago, IL, USA",
  "Houston, TX, USA",
  "Phoenix, AZ, USA",
  "Philadelphia, PA, USA",
  "San Antonio, TX, USA",
  "San Diego, CA, USA",
  "Dallas, TX, USA",
  "San Jose, CA, USA"
];

app.get('/dogs', async (req, res) => {
  try {
    const dogRes = await axios.get('https://dog.ceo/api/breeds/image/random/10');
    const nameRes = await axios.get('https://randomuser.me/api/?results=10&nat=us');

    const dogs = dogRes.data.message.map((imgUrl, index) => {
      const user = nameRes.data.results[index];

      if (!user) {
        throw new Error(`Usuário não encontrado no índice ${index}`);
      }

      const firstName = user.name.first;
      const phone = user.phone;
      const city = cidadesAmericanas[index % cidadesAmericanas.length]; 

      return {
        id: index + 1,
        name: firstName,
        phone: phone,
        city: city,
        age: Math.floor(Math.random() * 10) + 1,
        description: 'Um cachorrinho esperando por um lar!',
        image: imgUrl,
      };
    });

    res.json(dogs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao buscar dados dos cachorros ou nomes' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
