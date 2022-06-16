const {Agency, Client} = require('../../models');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const createAgency = async (agencyClientDetails) => {
    const {name, address1, address2, state, city, phoneNumber, clients} = agencyClientDetails;
    const agencyDetail = {
        name: name,
        address1: address1,
        state: state,
        city: city,
        phoneNumber: phoneNumber
    }
    if (address2) agencyDetail['address2'] = address2
    const agency = await Agency.create(agencyDetail);
    const clientPromise = clients.map(async (client) => {
        client['agencyId'] = agency.id
        await Client.create(client);
    })
    return Promise.all(clientPromise)
}

const updateClient = async (clientId,clientDetails) => {    
    const clientData = await Client.findByIdAndUpdate(clientId, clientDetails)
    return clientData;
}

const getTopClients = async (agencyId) =>{
    const clientData = await Agency.aggregate([
        {
          $lookup: {
            from: 'clients', 
            localField: '_id', 
            foreignField: 'agencyId', 
            as: 'clients'
          }
        },
        {
            $match: {
                _id: ObjectId(agencyId)
            }
        },
        {
          $unwind: {
            path: '$clients', 
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 0, 
            agencyName: '$name', 
            clientName: '$clients.name', 
            totalBill: '$clients.totalBill'
          }
        },
        {
          $sort: {
            totalBill: -1
          }
        }
      ]);
      return clientData;
}

module.exports = {
    createAgency,
    updateClient,
    getTopClients
}