const router = require('express').Router();

const {getUser, setPassword, updateUser, deleteUser, getEmployee, createEmployee, updateEmployee, deleteEmployee, getEmployeeExtraData, createEmployeeExtraData, updateEmployeeExtraData, deleteEmployeeExtraData, getUserHistory, createUserHistory, updateUserHistory, deleteUserHistory} = require('../controllers/users.controller');

router.get('', getUser);
router.post('/user/updatePassword/:id', setPassword);
router.put('/user/:id', updateUser);
router.delete('/user/:id',deleteUser);

router.get('/employee', getEmployee);
router.post('/employee', createEmployee);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);

router.get('/employeextradata', getEmployeeExtraData);
router.post('/employeextradata', createEmployeeExtraData);
router.put('/employeextradata/:id',updateEmployeeExtraData);
router.delete('/employeextradata/:id',deleteEmployeeExtraData);

router.get('/userhistory', getUserHistory)
router.post('/userhistory', createUserHistory)
router.put('/userhistory/:id',updateUserHistory)
router.delete('/userhistory/:id', deleteUserHistory)

module.exports = router;