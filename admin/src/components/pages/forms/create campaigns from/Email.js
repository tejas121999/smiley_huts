import React, { useState } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextEditor from '../../../layout/TextEditor';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File

const Email = ({
  emailTitle,
  setEmailTitle,
  setEmailType,
  email,
  longDesc,
  setLongDesc,
}) => {
  const [radioButton, setRadioButton] = useState('single');
  const [days, setDays] = useState(1);

  console.log(longDesc);
  return (
    <div className="row">
      <div className="col-4">
        <div className="form-check">
          <div className="single_check">
            <input
              onChange={e => setEmailType(e.target.value)}
              className="form-check-input"
              type="radio"
              checked={email === 'single'}
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="single"
            />
            <label className="form-check-label" for="flexRadioDefault1">
              Single Email
            </label>
          </div>
          <div className="multiple_check">
            <input
              checked={email === 'Multiple'}
              className="form-check-input"
              type="radio"
              name="flexRadioDefault"
              id="flexRadioDefault1"
              value="Multiple"
              onChange={e => setEmailType(e.target.value)}
            />
            <label className="form-check-label" for="flexRadioDefault1">
              multiple Email
            </label>
          </div>
        </div>

        {/* <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="single"
                        name="radio-buttons-group"
                        value={radioButton}
                        onChange={(e) => setRadioButton(e.target.value)}
                    >
                        <FormControlLabel value="single" control={<Radio />} label="Single Email" className='single_check' />
                        <FormControlLabel value="multiple" control={<Radio />} label="Multiple Email" className='multiple_check' />
                    </RadioGroup>
                </FormControl> */}
        {radioButton == 'multiple' ? (
          <>
            <div className="Email_card">
              <div className="number_email">1</div>
              <div className="email_name">Email 1</div>
              <div className="email_body">
                <span>wiit</span>
                <div className="wait_number">{days}</div>
              </div>
              <select
                className="days"
                value={days}
                onChange={e => setDays(e.target.value)}
                aria-label="Default select example"
              >
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
                <option value="4">Four</option>
              </select>
            </div>

            <button className="btn btn-outline-dark add_Email">
              Add Email
            </button>
          </>
        ) : null}
      </div>
      <div className="col-8">
        <div className="editor">
          <input
            type="text"
            value={emailTitle}
            onChange={e => setEmailTitle(e.target.value)}
          />
          <SunEditor
            showToolbar={true}
            value={longDesc}
            onChange={Desc => {
              setLongDesc(Desc);
            }}
            height="300px"
            width="1000px"
            setOptions={{
              buttonList: [
                [
                  'bold',
                  'underline',
                  'italic',
                  'strike',
                  'list',
                  'align',
                  'fontSize',
                  'formatBlock',
                  'table',
                  'image',
                ],
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Email;
