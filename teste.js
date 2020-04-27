db.mycollection.insertOne(
    {
        numero: "5008888-89.2018",

        reus: [ 
            {nome: "João Doria", citado: "não"}, 
            {nome: "Getúlio Vargas", citado: "não"} ],

        servidores: [
            "Eduardo",
            "Regina"
        ],

        classe: "Usucapião",

        informacoes: {
            ano: 2020,
            vara: "primeira"
        }   
    }
)

db.mycollection.insertOne(
    {
        numero: "5007777-89.2018",

        reus: [ 
            {nome: "Joaquim Nabuco", citado: "não"}, 
            {nome: "Olavo Bilac", citado: "não"} ],

        servidores: [
            "Alan",
            "Regina"
        ],

        classe: "Inventário",

        informacoes: {
            ano: 2019,
            vara: "primeira"
        }   
    }
)

db.mycollection.find(
    {
        'reus.nome': "João Doria"
    }
)

db.mycollection.updateOne(
    {"reus.nome": "João Doria"},
    {$push : {servidores: "Eduardo"}}
)

db.mycollection.find(
    {"reus.nome": "João Doria"},
)



db.mycollection.updateOne(
    {"reus.nome": "João Doria", "reus.nome": "Joaquim Nabuco"},
    {$set: {"reus.$.nome": "Joel Santana"}}
)

db.mycollection.updateOne(
    {"reus.nome": "João Doria", servidores: "Alan"},
    {$set: {"servidores.$": "Eduardo"}}
)

db.mycollection.updateOne(
    {"reus.nome": "João Doria"},
    {$push: {reus: {nome: "Joel Santana", citado: "não"}}}
)

db.mycollection.updateOne(
    {"reus.nome": "João Doria"},
    {$pull: {reus: {nome: "Joel Santana", citado: "não"}}}
)

db.mycollection.updateOne(
    {"reus.nome": "João Doria"},
    {$pull: {reus: {nome: "Joel Santana"} }}
)

Processo.updateOne(
    {_id: req.params.id},
    {$pull: {reus: {nome: req.params.nome}}}
)

Processo.updateOne({_id: req.params.id}, {$pull: {reus: {nome: req.params.nome}}})