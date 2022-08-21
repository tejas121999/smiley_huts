import axios from 'axios';
import React, { useState } from 'react';
import dummy_img from '../../../layout/images/dummy_img.png';
import FamilyDropzone from '../FamalyDropzone';

// [
//   { image: 'flat_bedroom.webp' },
//   { image: 'flat_hall.jpg' },
//   { image: 'flat_kitchen.webp' },
//   { image: 'flat_bedroom.webp' },
//   { image: 'flat_hall.jpg' },
//   { image: 'flat_kitchen.webp' },
// ];

const Famaly = ({ families, setFamily, setMoreMembers, moreMembers }) => {

  const addMoreMembers = () => {
    // let newInputId = families[families.length - 1].id + 1;
    setMoreMembers(prev => [
      ...prev,
      {
        fam_user_id: 1,
        famalyMember_count: families.length,
        family_member_img: null,
        // id: newInputId,
        member_name: '',
        member_relation: '',
      },
    ]);
  };

  const handleFamilyRemove = async (id, index) => {
    let arr = [...families];
    arr.splice(index, 1);
    setFamily(arr);
    const res = await axios.post(
      process.env.REACT_APP_DEV_URL + '/api/auth/removeFamily',
      { id },
      {
        headers: {
          'x-auth-token':
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA2MzI3N30.m2a26rvLm1yMErLovWMeZQhcQXlTrQOEdangNw-E3Ss',
        },
      }
    );
    console.log(res);
  };
  const [familyImageArr, setFamilyImageArr] = useState([]);
  const handleFamily = async imgData => {
    setFamilyImageArr(prev => [...prev, imgData[0]]);
  }
  console.log("family  = = = = = =", families);

  return (
    <div className="family-main">
      <div className="row">
        <div className="col-12">
          <select
            className="form-select select_class"
            id="inputGroupSelect01">
            <option selected value="1">
              Yes
            </option>
            <option value="2">No</option>
            {/* <option value="3">Three</option> */}
          </select>
        </div>
        <div className="col-12 mb-3">
          <input
            className="form-control Fam_total_number"
            value={families.length}
          />
        </div>
      </div>
      <span className="famaly_text">Family Member's Details</span>
      {families.map((family, i) => {
        return (
          <div className="members_list">
            <img
              style={{ height: '50px', width: '70px' }}
              src={
                family.family_member_img ? family.family_member_img : dummy_img
              }
              className="members_img"
            />
            <input
              value={family.member_name}
              onChange={e => {
                let newArr = [...families];
                newArr[i].member_name = e.target.value;
                setFamily(newArr);
              }}
              className="form-control relation_input1"
              placeholder="relation"
            />
            <input
              onChange={e => {
                let newArr = [...families];
                newArr[i].member_relation = e.target.value;
                setFamily(newArr);
              }}
              value={family.member_relation}
              className="form-control relation_input2"
              placeholder="relation"
            />
            <div className="cancel-icon">
              <i
                class="fa-solid fa-xmark"
                onClick={id => handleFamilyRemove(family.id, i)}
              ></i>
            </div>
          </div>
        );
      })}
      {moreMembers.map((family, i) => {
        return (
          <div className="members_list">
            <FamilyDropzone onChangeImage={handleFamily} />
            <input
              value={family.member_name}
              onChange={e => {
                let newArr = [...moreMembers];
                newArr[i].member_name = e.target.value;
                setMoreMembers(newArr);
              }}
              className="form-control relation_input1"
              placeholder="relation"
            />
            <input
              onChange={e => {
                let newArr = [...moreMembers];
                newArr[i].member_relation = e.target.value;
                setMoreMembers(newArr);
              }}
              value={family.member_relation}
              className="form-control relation_input2"
              placeholder="relation"
            />
            <div className="cancel-icon">
              <i
                class="fa-solid fa-xmark"
              ></i>
            </div>
          </div>
        );
      })}

      <div className="Add_More" onClick={addMoreMembers}>
        <p> + Add More</p>
      </div>
    </div>
  );
};

{
  /* <div className="col-4">
           
            </div>
            <div className="col-4"></div>
            <div className="col-4"></div> */
}

export default Famaly;
