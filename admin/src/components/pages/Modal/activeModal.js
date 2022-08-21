import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { CloseButton, Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.css';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Paper from '@material-ui/core/Paper';

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from 'chart.js';
import {
  Chart,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2';

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

export const options = {
  scales: {
    y: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false,
        // padding: 50,
      },
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
        // offset: true
      },
      ticks: {},
    },
  },
  plugins: {
    legend: {
      display: false,
    },
  },
};

const ActiveModal = props => {
  const chartRef = useRef(null);
  const chartRef2 = useRef(null);

  const [chartData, setChartData] = useState({});

  const [chartSub, setChartSub] = useState({});

  // const [chart, setChart] = useState({})
  useEffect(() => {
    let regCount = [];
    let reMonth = [];

    axios
      .get(process.env.REACT_APP_DEV_URL + '/api/auth/getUserMonth', {
        headers: {
          'x-auth-token': `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjgsImlhdCI6MTY1NDA3ODEzM30.FNfBFklZCDm39ZGicsuQuICMXarIhQh7BmUZ9m_8n7U`,
        },
      })
      .then(res => {
        let monthLabel = '';
        for (const dataObj of res.data) {
          console.log('dataObj is ------------>', dataObj);
          if (dataObj.month === 1) {
            monthLabel = 'Jan';
          } else if (dataObj.month === 2) {
            monthLabel = 'Feb';
          } else if (dataObj.month === 3) {
            monthLabel = 'Mar';
          } else if (dataObj.month === 4) {
            monthLabel = 'Apr';
          } else if (dataObj.month === 5) {
            monthLabel = 'May';
          } else if (dataObj.month === 6) {
            monthLabel = 'Jun';
          } else if (dataObj.month === 7) {
            monthLabel = 'Jul';
          } else if (dataObj.month === 8) {
            monthLabel = 'Aug';
          } else if (dataObj.month === 9) {
            monthLabel = 'Sep';
          } else if (dataObj.month === 10) {
            monthLabel = 'Oct';
          } else if (dataObj.month === 11) {
            monthLabel = 'Nov';
          } else if (dataObj.month === 12) {
            monthLabel = 'Dec';
          } else {
            monthLabel = '';
          }
          reMonth.push(monthLabel);
          console.log('remonth--------->', reMonth);

          regCount.push(parseInt(dataObj.data));
          setChartData({
            labels: reMonth,
            datasets: [
              {
                type: 'bar',
                label: 'Registration',
                backgroundColor: ['#4CBC9A', '#FEC64F', '#EA4333'],
                data: regCount,

                borderColor: 'white',
                borderWidth: 2,
                borderRadius: 10,
              },
            ],
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let subCount = [];
    let subMonth = [];

    axios
      .get(
        process.env.REACT_APP_DEV_URL + '/api/Subscription/getSubscription',
        {
          headers: {
            'x-auth-token': localStorage.getItem('access-token'),
          },
        }
      )
      .then(res => {
        let monthLabel = '';
        for (const dataObj of res.data) {
          console.log('dataObj is ------------>', dataObj);
          if (dataObj.month === 1) {
            monthLabel = 'Jan';
          } else if (dataObj.month === 2) {
            monthLabel = 'Feb';
          } else if (dataObj.month === 3) {
            monthLabel = 'Mar';
          } else if (dataObj.month === 4) {
            monthLabel = 'Apr';
          } else if (dataObj.month === 5) {
            monthLabel = 'May';
          } else if (dataObj.month === 6) {
            monthLabel = 'Jun';
          } else if (dataObj.month === 7) {
            monthLabel = 'Jul';
          } else if (dataObj.month === 8) {
            monthLabel = 'Aug';
          } else if (dataObj.month === 9) {
            monthLabel = 'Sep';
          } else if (dataObj.month === 10) {
            monthLabel = 'Oct';
          } else if (dataObj.month === 11) {
            monthLabel = 'Nov';
          } else if (dataObj.month === 12) {
            monthLabel = 'Dec';
          } else {
            monthLabel = '';
          }
          subMonth.push(monthLabel);

          subCount.push(parseInt(dataObj.payment));

          console.log('subMonth----------------->', subMonth);
          console.log('subCount----------------->', subCount);
          setChartSub({
            labels: subMonth,
            datasets: [
              {
                type: 'bar',
                label: 'Registration',
                backgroundColor: ['#4CBC9A', '#FEC64F', '#EA4333'],
                data: subCount,

                borderColor: 'white',
                borderWidth: 2,
                borderRadius: 10,
              },
            ],
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body closeButton>
        <div>
          <Tabs defaultActiveKey="second">
            <Tab eventKey="first" title="Registrations">
              <Paper>
                <Chart
                  ref={chartRef}
                  type="bar"
                  // onClick={onClick}
                  options={options}
                  data={chartData}
                />
              </Paper>
            </Tab>
            <Tab eventKey="second" title="Subscription">
              <Paper>
                <Chart
                  ref={chartRef2}
                  type="bar"
                  // onClick={onClick}
                  options={options}
                  data={chartSub}
                />
              </Paper>
            </Tab>
          </Tabs>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ActiveModal;
