const { Famaly } = require("../models")
const model = require("../models")

exports.getFamilyDataByUserId = async (req, res) => {
    try {
        const family = await Famaly.findAll({
            where: {
                fam_user_id: req.body.user_id
            }
        })
        if (family) {
            res.status(200).json(family)
        } else {
            res.status(400).json("Family not found")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}
