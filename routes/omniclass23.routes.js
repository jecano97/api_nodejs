const router = require('express').Router();

const {getOmc23N1, createNewOmc23N1, updateOmc23N1, deleteOmc23N1, createNewOmc23N2, getOmc23N2, updateOmc23N2, deleteOmc23N2, getOmc23N3, createNewOmc23N3, updateOmc23N3,
     deleteOmc23N3, getOmc23N4, createNewOmc23N4, updateOmc23N4, deleteOmc23N4, getOmc23N5, createNewOmc23N5, updateOmc23N5, deleteOmc23N5, getOmc23N6, createNewOmc23N6, updateOmc23N6, deleteOmc23N6} = require('../controllers/omniclass23.controller');

router.get('/OMC23Nivel1', getOmc23N1);
router.post('/OMC23Nivel1', createNewOmc23N1);
router.put('/OMC23Nivel1/:id', updateOmc23N1);
router.delete('/OMC23Nivel1/:id', deleteOmc23N1);

router.get('/OMC23Nivel2', getOmc23N2);
router.post('/OMC23Nivel2', createNewOmc23N2);
router.put('/OMC23Nivel2/:id', updateOmc23N2);
router.delete('/OMC23Nivel2/:id', deleteOmc23N2);

router.get('/OMC23Nivel3', getOmc23N3);
router.post('/OMC23Nivel3', createNewOmc23N3);
router.put('/OMC23Nivel3/:id', updateOmc23N3);
router.delete('/OMC23Nivel3/:id', deleteOmc23N3);

router.get('/OMC23Nivel4', getOmc23N4);
router.post('/OMC23Nivel4', createNewOmc23N4);
router.put('/OMC23Nivel4/:id', updateOmc23N4);
router.delete('/OMC23Nivel4/:id',deleteOmc23N4);

router.get('/OMC23Nivel5', getOmc23N5);
router.post('/OMC23Nivel5', createNewOmc23N5);
router.put('/OMC23Nivel5/:id', updateOmc23N5);
router.delete('/OMC23Nivel5/:id',deleteOmc23N5);

router.get('/OMC23Nivel6', getOmc23N6);
router.post('/OMC23Nivel6', createNewOmc23N6);
router.put('/OMC23Nivel6/:id', updateOmc23N6);
router.delete('/OMC23Nivel6/:id',deleteOmc23N6);

module.exports = router;