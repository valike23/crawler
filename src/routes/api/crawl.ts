import axios from "axios";

export async function get(req, res) {
    let data = await axios.get(req.query.id);
    console.log(data.data);
    res.json(JSON.stringify(data.data));
    
}