import mercadopago from "mercadopago";
import { HOST_FRONT, HOST_BACK, TOKEN} from "../config.js";

export const payment = async (req, res) => {
    mercadopago.configure({
        access_token: TOKEN
    });

    const result = await mercadopago.preferences.create({
        items:[
            {
                title: 'Reserva básica de servicio',
                unit_price: 30000,
                currency_id: 'COP',
                quantity: 1
            }
        ],
        back_urls:{
            success: `${HOST_FRONT}/bookingNew`,
            failure: `${HOST_FRONT}/failbooking`,
            pending: `${HOST_FRONT}/pendingbooking`
        },
        notification_url: `${HOST_BACK}/webhook`,
    })
    res.json({id: result.body});
};

export const receiveHook  = async (req, res) => {
    const pay = req.query;
    try{
        if(pay.type === 'payment'){
            const data = await mercadopago.payment.findById(pay['data.id']);
            console.log('aja', data);
            //guardar en db
        }
        res.sendStatus(204);
    } catch (error){
        console.log(error);
        return res.sendStatus(500).json({error: error.message});
    }
};