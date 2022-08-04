const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

const getAll = async() => await Cube.find({}).lean();
const getOneWithDetails = async(id) => await Cube.findById(id).populate('accessories').lean();
const getOne = async(id) => await Cube.findById(id).lean();
const deleteCube = (id) => Cube.findByIdAndDelete(id);
const updateCube = (id, updatedCube) => Cube.findByIdAndUpdate(id, updatedCube, { runValidators: true });

const search = async (text, from, to) => {
    let result = await getAll();
    console.log(result)

    if(text) {
        result = result.filter(x => x.name.toLowerCase().includes(text.toLowerCase()));
    }

    if(from) {
        result = result.filter(x => x.difficulty >= from)
    }

    if(to) {
        result = result.filter(x => x.difficulty <= to);
    }
    
    return result;
    
}

const create = async(name, description, imageUrl, difficulty, creatorId) => {
    let cube = new Cube({
        name,
        description,
        imageUrl,
        difficulty,
        creator: creatorId 
    });
    
    return await cube.save();
}

const attachAccessory = async(cubeId, accessoryId) => {
    let cube = await Cube.findById(cubeId);
    const accessory = await Accessory.findById(accessoryId);

    cube.accessories.push(accessory)

    return cube.save();
}

const cubeService = {
    create,
    getAll,
    getOneCube: getOneWithDetails,
    getOne,
    search,
    attachAccessory,
    deleteCube,
    updateCube
}

module.exports = cubeService;