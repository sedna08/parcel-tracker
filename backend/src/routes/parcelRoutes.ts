import * as express from 'express';
import * as parcelControls from '../controllers/parcelController'

const router = express.Router();

// Define Routes
router.get("/parcels", parcelControls.getParcels)
router.get('/parcels/:parcel_id/actions',parcelControls.getParcelActions)
router.post("/parcels",parcelControls.createParcel)
router.put('/parcels/:parcel_id/status',parcelControls.updateParcelStatus)

// cors
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

export default router;