export default async function handler(req, res) {
    const id = req.query.id;
    const origem = req.query.origem;

    try {
        if (origem === "ml") {
            const r = await fetch(`https://api.mercadolibre.com/items/${id}`);
            const j = await r.json();
            res.json({ preco: "R$ " + j.price });
        } 
        else if (origem === "shopee") {
            const r = await fetch(`https://shopee.com.br/api/v4/item/get?itemid=${id}&shopid=1`);
            const j = await r.json();
            const preco = j.data.price / 100000;
            res.json({ preco: "R$ " + preco.toFixed(2) });
        }
    } catch (e) {
        res.json({ preco: "Indisponível" });
    }
}