const { Booking, Property, Notification, Users } = require('../models');
const model = require('../models');
const { Op } = require('sequelize');

// checkExistingBookings
exports.checkExistingBookings = async (req, res) => {
  const {
    // booking_user_id,
    property_id,
    // startDate,
    // endDate,
    // property_name,
    // owner_id,
    // booked_user_name
  } = req.body;
  const startDate = req.body.start_date;
  const endDate = req.body.end_date;
  const booking_month = new Date().getMonth()
  try {
    const month = await Booking.findOne({
      where: {
        [Op.and]: [
          { booking_user_id: req.body.booking_user_id },
          { booking_month: booking_month }
        ]
      }
    })
    if (month) {
      res.status(400).json('You can book property once in month')
    } else if (new Date(endDate) - new Date(startDate) > 432000000) {
      res.status(400).json('You can select max 5 days');
    } else {
      const booked_property = await Booking.findAll({
        where: {
          [Op.and]: [
            { property_id: property_id },
            // where: {
            {
              [Op.or]: [
                {
                  start_date: {
                    [Op.between]: [startDate, endDate],
                  },
                },
                {
                  end_date: {
                    [Op.between]: [startDate, endDate],
                  },
                },
              ],
            },
          ],
        },
      });

      const booked_property_between = await Booking.findAll({
        where: {
          [Op.and]: [
            { property_id: property_id },
            {
              [Op.and]: [
                {
                  start_date: {
                    [Op.lte]: startDate,
                  },
                },
                {
                  end_date: {
                    [Op.gte]: startDate,
                  },
                },
              ],
            },
            {
              [Op.and]: [
                {
                  start_date: {
                    [Op.lte]: endDate,
                  },
                },
                {
                  end_date: {
                    [Op.gte]: endDate,
                  },
                },
              ],
            },
            // {
            //     [Op.and]: [
            //         {
            //             start_date: {
            //                 [Op.gte]: endDate
            //             }
            //         },
            //         {
            //             end_date: {
            //                 [Op.lte]: endDate
            //             }
            //         }
            //     ]
            // }
          ],
        },
      });
      console.log('==========', booked_property);
      console.log('111111111111111', booked_property);
      if (
        !booked_property.length == 0 ||
        !booked_property_between.length == 0
      ) {
        res.status(400).json('Property is already booked for selected date');
      } else {
        res.status(200).json('Property is available for selected date');
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// booking request
exports.addBookingRequest = async (req, res) => {
  var date = new Date()

  try {
    const {
      booking_user_id,
      property_id,
      // startDate,
      // endDate,
      property_name,
      owner_id,
      booked_user_name,

    } = req.body;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    const booking_month = new Date().getMonth()


    // const month = await Booking.findOne({
    //   where: {
    //     [Op.and]: [
    //       { booking_user_id: req.body.booking_user_id },
    //       { booking_month: booking_month }
    //     ]
    //   }
    // })
    // console.log("month", month)
    // if (month) {
    //   res.status(400).json('You can book property once in month')
    // }

    // else {
    if (new Date(endDate) - new Date(startDate) > 432000000) {
      res.status(400).json('You can select max 5 days');
    } else {
      var booked_property = await Booking.findAll({
        where: {
          [Op.and]: [
            { property_id: property_id },
            // where: {
            {
              [Op.or]: [
                {
                  start_date: {
                    [Op.between]: [startDate, endDate],
                  },
                },
                {
                  end_date: {
                    [Op.between]: [startDate, endDate],
                  },
                },
              ],
            },
          ],
        },
      });
    }


    var booked_property_between = await Booking.findAll({
      where: {
        [Op.and]: [
          { property_id: property_id },
          {
            [Op.and]: [
              {
                start_date: {
                  [Op.lte]: startDate,
                },
              },
              {
                end_date: {
                  [Op.gte]: startDate,
                },
              },
            ],
          },
          {
            [Op.and]: [
              {
                start_date: {
                  [Op.lte]: endDate,
                },
              },
              {
                end_date: {
                  [Op.gte]: endDate,
                },
              },
            ],
          },
          // {
          //     [Op.and]: [
          //         {
          //             start_date: {
          //                 [Op.gte]: endDate
          //             }
          //         },
          //         {
          //             end_date: {
          //                 [Op.lte]: endDate
          //             }
          //         }
          //     ]
          // }
        ],
      },
    });
    // console.log('=====================', booked_property);
    // console.log('11111111111111111', booked_property_between);

    if (
      !booked_property.length == 0 ||
      !booked_property_between.length == 0
    ) {
      res.status(400).json('Property is already booked for selected date');
    } else {
      console.log('1111111111111111111111');
      var booking_req = await Booking.create({
        booking_user_id,
        property_id,
        start_date: startDate,
        end_date: endDate,
        booking_month: booking_month
      });

      const guestUserNotification = {
        userId: booking_user_id,
        property_id,
        title: 'Stay Successfully Booked',
        desc: 'Your Booking is successfull for ' + property_name,
      };

      const ownerNotification = {
        userId: owner_id,
        property_id,
        title: 'Stay Successfully Booked',
        desc: 'Your Stay is successfull by ' + booked_user_name,
      };

      var bookingNotification = await Notification.create(ownerNotification);
      var bookingNotification = await Notification.create(
        guestUserNotification
      );
      if (!booking_req) {
        return res.status(401).json({
          message: 'failed',
        });
      } else {
        return res.status(200).json({
          message: 'approve',
          booking_req,
        });
      }
    }
    // }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//get homestay bookings

exports.getHomeStayBookings = async (req, res) => {
  try {
    const id = req.body;
    var getBookingCount = await Booking.count();
    if (!getBookingCount) {
      return res.status(400).json({
        msg: 'There is no booking',
      });
    }
    res.json(getBookingCount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Aprove decline booking

exports.Approve_Decline_booking = async (req, res) => {
  try {
    Booking.findByPk(req.body.bookingId).then(approve => {
      Booking.update(
        {
          isAccepted: req.body.isAccepted,
        },
        {
          where: {
            id: req.body.bookingId,
          },
        }
      )
        .then(_ => {
          res.status(200).send({
            message: 'Booking status updated',
          });
        })
        .catch(err => res.status(400).send(err));
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// update Start Date and End date

exports.update_date = async (req, res) => {
  try {
    const {
      booking_user_id,
      // property_id,
      // startDate,
      // endDate,
      property_name,
      owner_id,
      booked_user_name,
    } = req.body;
    const id = req.body.abc;
    const property_id = req.body.prop_id;
    const startDate = req.body.start_date;
    const endDate = req.body.end_date;
    if (new Date(endDate) - new Date(startDate) > 432000000) {
      res.status(400).json('You can select max 5 days');
    } else {
      var booked_property = await Booking.findAll({
        where: {
          [Op.and]: [
            { property_id: property_id },
            // where: {
            {
              [Op.or]: [
                {
                  start_date: {
                    [Op.between]: [startDate, endDate],
                  },
                },
                {
                  end_date: {
                    [Op.between]: [startDate, endDate],
                  },
                },
              ],
            },
          ],
        },
      });

      var booked_property_between = await Booking.findAll({
        where: {
          [Op.and]: [
            { property_id: property_id },
            {
              [Op.and]: [
                {
                  start_date: {
                    [Op.lte]: startDate,
                  },
                },
                {
                  end_date: {
                    [Op.gte]: startDate,
                  },
                },
              ],
            },
            {
              [Op.and]: [
                {
                  start_date: {
                    [Op.lte]: endDate,
                  },
                },
                {
                  end_date: {
                    [Op.gte]: endDate,
                  },
                },
              ],
            },
            // {
            //     [Op.and]: [
            //         {
            //             start_date: {
            //                 [Op.gte]: endDate
            //             }
            //         },
            //         {
            //             end_date: {
            //                 [Op.lte]: endDate
            //             }
            //         }
            //     ]
            // }
          ],
        },
      });
      console.log('=====================', booked_property);
      console.log('11111111111111111', booked_property_between);

      if (
        !booked_property.length == 0 ||
        !booked_property_between.length == 0
      ) {
        res.status(400).json('Property is already booked for selected date');
      } else {
        console.log('1111111111111111111111');

        Booking.findByPk(req.body.abc).then(approve => {
          Booking.update(
            {
              start_date: req.body.start_date,
              end_date: req.body.end_date,
            },
            {
              where: {
                id: req.body.abc,
              },
            }
          )
            .then(_ => {
              res.status(200).send({
                message: 'Booking status updated',
              });
            })
            .catch(err => res.status(400).send(err));
        });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// get all booking request
exports.getAllBookingRequest = async (req, res) => {
  try {
    var get_allBooking = await Booking.findAll({
      where: {
        isAccepted: false,
      },
      attributes: [
        'booking_user_id',
        'property_id',
        'stay_completed',
        'start_date',
        'end_date',
        'booking_ammount',
        'transactio_id',
        'payment_methode',
        'isAccepted',
        'createdAt',
        'updatedAt',
      ],
      subQuery: false,
      include: [
        {
          model: model.User,
          as: 'users',
          subQuery: false,
          attributes: [
            'first_name',
            'last_name',
            'address',
            'user_img',
            'contact_number',
            'user_id_proof',
            'having_pet',
            'password',
            'email',
            'isApproved',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
        {
          model: model.Property,
          as: 'propId',
          subQuery: false,
          attributes: [
            'prop_address',
            'prop_type',
            'prop_address',
            'street_name',
            'pincode',
            'landmark',
            'pro_img',
            'review',
            'photo_req',
          ],
          include: [
            {
              model: model.User,
              as: 'users',
              subQuery: false,
              attributes: [
                'first_name',
                'last_name',
                'address',
                'user_img',
                'contact_number',
                'user_id_proof',
                'having_pet',
                'relation',
                'password',
                'email',
                'isApproved',
                'isActive',
                'createdAt',
                'updatedAt',
              ],
            },
          ],
        },
      ],
    });
    if (!get_allBooking) {
      return res.status(401).json({
        message: 'is failed',
      });
    } else {
      return res.status(200).json({
        message: 'approve',
        get_allBooking,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// get all booking request
exports.getAllreservation = async (req, res) => {
  try {
    var get_allBooking = await Booking.findAll({
      where: {
        isAccepted: true,
      },
      attributes: [
        'booking_user_id',
        'property_id',
        'stay_completed',
        'start_date',
        'end_date',
        'booking_ammount',
        'transactio_id',
        'payment_methode',
        'isAccepted',
        'createdAt',
        'updatedAt',
      ],
      subQuery: false,
      include: [
        {
          model: model.User,
          as: 'users',
          subQuery: false,
          attributes: [
            'first_name',
            'last_name',
            'address',
            'user_img',
            'contact_number',
            'user_id_proof',
            'having_pet',
            'password',
            'email',
            'isApproved',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
      ],
    });
    if (!get_allBooking) {
      return res.status(401).json({
        message: 'is failed',
      });
    } else {
      return res.status(200).json({
        message: 'approve',
        get_allBooking,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//get all upcoming bookings

exports.getUpcomingDates = async (req, res) => {
  try {
    var getUpcoming = await Booking.findAll({
      where: {
        start_date: {
          [Op.gt]: new Date(),
        },
      },
      attributes: [
        'booking_user_id',
        'property_id',
        'stay_completed',
        'start_date',
        'end_date',
        'booking_ammount',
        'transactio_id',
        'payment_methode',
        'isAccepted',
        'createdAt',
        'updatedAt',
      ],
      subQuery: false,
      include: [
        {
          model: model.User,
          as: 'users',
          subQuery: false,
          attributes: [
            'first_name',
            'last_name',
            'address',
            'user_img',
            'contact_number',
            'user_id_proof',
            'having_pet',
            'password',
            'email',
            'isApproved',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
        {
          model: model.Property,
          as: 'propId',
          subQuery: false,
          attributes: [
            'prop_address',
            'prop_type',
            'prop_address',
            'street_name',
            'pincode',
            'landmark',
            'pro_img',
            'review',
            'photo_req',
          ],
          include: [
            {
              model: model.User,
              as: 'users',
              subQuery: false,
              attributes: [
                'first_name',
                'last_name',
                'address',
                'user_img',
                'contact_number',
                'user_id_proof',
                'having_pet',
                'password',
                'email',
                'isApproved',
                'isActive',
                'createdAt',
                'updatedAt',
              ],
            },
          ],
        },
      ],
    });
    if (!getUpcoming) {
      return res.status(401).json({
        message: 'is failed',
      });
    } else {
      return res.status(200).json({
        message: 'approve',
        getUpcoming,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// get completed bookings

exports.getCompleteBooking = async (req, res) => {
  try {
    var getComplete = await Booking.findAll({
      where: {
        stay_completed: true,
      },
      attributes: [
        'booking_user_id',
        'property_id',
        'stay_completed',
        'start_date',
        'end_date',
        'booking_ammount',
        'transactio_id',
        'payment_methode',
        'isAccepted',
        'createdAt',
        'updatedAt',
      ],
      subQuery: false,
      include: [
        {
          model: model.User,
          as: 'users',
          subQuery: false,
          attributes: [
            'first_name',
            'last_name',
            'address',
            'user_img',
            'contact_number',
            'user_id_proof',
            'having_pet',
            'password',
            'email',
            'isApproved',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
      ],
    });
    if (!getComplete) {
      return res.status(401).json({
        message: 'is failed',
      });
    } else {
      return res.status(200).json({
        message: 'approve',
        getComplete,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// get upcoming booking counts

exports.getUpcomingCounts = async (req, res) => {
  try {
    var getUpcomingCount = await Booking.count({
      where: {
        start_date: {
          [Op.gt]: new Date(),
        },
      },
    });
    if (!getUpcomingCount) {
      return res.status(400).json({
        msg: 'There is no booking',
      });
    }
    res.json(getUpcomingCount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// get completed booking counts

exports.getCompleteCount = async (req, res) => {
  try {
    var getCompleteCount = await Booking.count({
      where: {
        stay_completed: true,
      },
    });
    if (!getCompleteCount) {
      return res.status(400).json({
        msg: 'There is no booking',
      });
    }
    res.json(getCompleteCount);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//get declined booking counts
exports.getDeclineCount = async (req, res) => {
  try {
    var decline = await Booking.count({
      where: {
        isAccepted: false,
      },
    });
    if (!decline) {
      return res.status(400).json({
        msg: 'There is no Decline booking',
      });
    }
    res.json(decline);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//  get user data by reservation id

exports.getReservationUserDatabyId = async (req, res) => {
  try {
    // const userData = await Booking.findByPk(req.params.id)
    const userData = await Booking.findAll({
      where: {
        booking_user_id: req.params.id,
      },
      attributes: [
        'id',
        'booking_user_id',
        'property_id',
        'stay_completed',
        'start_date',
        'end_date',
        'booking_ammount',
        'transactio_id',
        'payment_methode',
        'isAccepted',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: model.User,
          as: 'users',
          subQuery: false,
          attributes: [
            'first_name',
            'last_name',
            'address',
            'user_img',
            'contact_number',
            'user_id_proof',
            'having_pet',
            'password',
            'email',
            'isApproved',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
        {
          model: model.Property,
          as: 'propId',
          subQuery: false,
          attributes: [
            'prop_address',
            'prop_type',
            'prop_address',
            'street_name',
            'pincode',
            'landmark',
            'pro_img',
            'review',
            'photo_req',
          ],
          include: [
            {
              model: model.User,
              as: 'users',
              subQuery: false,
              attributes: [
                'first_name',
                'last_name',
                'address',
                'user_img',
                'contact_number',
                'user_id_proof',
                'having_pet',
                'password',
                'email',
                'isApproved',
                'isActive',
                'createdAt',
                'updatedAt',
              ],
            },
          ],
        },
      ],
    });
    if (!userData) {
      return res.status(401).json({
        message: 'is failed',
      });
    } else {
      return res.status(200).json({
        message: 'Reservation Data',
        userData,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getGuestRequestsByUserId = async (req, res) => {
  // try {
  //     const propertyData = await Property.findOne({
  //         where:{
  //             user_id : req.params.userId
  //         },
  //     })
  // } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send('Server Error');
  // }

  // return res.status(200).json({
  //     message: "approve"
  // })

  try {
    var user_property_id = await Property.findOne({
      where: {
        user_id: req.body.userId,
      },
      attributes: ['id'],
      subQuery: false,
    });

    console.log('user_property_id-----------', user_property_id.id);

    const all_bookings = await Booking.findAll({
      where: {
        property_id: user_property_id.id,
      },
      include: [
        {
          model: model.User,
          as: 'users',
          subQuery: false,
          attributes: [
            'first_name',
            'last_name',
            'address',
            'user_img',
            'contact_number',
            'user_id_proof',
            'having_pet',
            'password',
            'email',
            'isApproved',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
        {
          model: model.Property,
          as: 'propId',
          subQuery: false,
          attributes: [
            'prop_address',
            'prop_type',
            'prop_address',
            'street_name',
            'pincode',
            'landmark',
            'pro_img',
            'review',
            'photo_req',
          ],
        },
      ],
    });

    if (!all_bookings) {
      return res.status(401).json({
        message: 'is failed',
      });
    } else {
      return res.status(200).json({
        message: 'approve',
        all_bookings,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//BookingsCalender
exports.getBookingCalender = async (req, res) => {
  try {
    var getCalenderBookings = await Booking.findAll({
      where: {
        isAccepted: true,
      },
      attributes: [
        'booking_user_id',
        'property_id',
        'stay_completed',
        'start_date',
        'end_date',
        'booking_ammount',
        'transactio_id',
        'payment_methode',
        'isAccepted',
        'createdAt',
        'updatedAt',
      ],
      subQuery: false,
      include: [
        {
          model: model.User,
          as: 'users',
          subQuery: false,
          attributes: [
            'first_name',
            'last_name',
            'address',
            'user_img',
            'contact_number',
            'user_id_proof',
            'having_pet',
            'password',
            'email',
            'isApproved',
            'isActive',
            'createdAt',
            'updatedAt',
          ],
        },
      ],
    });
    if (!getCalenderBookings) {
      return res.status(401).json({
        message: 'No Booking Calender',
      });
    } else {
      return res.status(200).json({
        message: 'approve',
        getCalenderBookings,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

//CANCEL BOOKING ON TIMER 24HRS
exports.cancelBookingOnTimer = async (req, res) => {
  try {
    const allBookings = await Booking.findAll({
      where: {
        createdAt: {
          [Op.lte]: Date.now() - 86400000,
        },
      },
    });
    console.log('Allllllllllllllllllllllll', allBookings);
    allBookings
      .map(booking => {
        Booking.update(
          {
            isAccepted: 2,
          },
          {
            where: {
              id: booking.id,
            },
          }
        );
      })
      .then(() => {
        res.status(200).json('Booking successfully cancelled');
      });
  } catch (err) {
    res.status(500).json(err);
  }
};

//CANCEL BOOKING ON TIMER 12HRS
exports.cancelBookingOnTimer = async (req, res) => {
  try {
    const allBookings = await Booking.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.lte]: Date.now() - 43200000,
            },
          },
          {
            isAccepted: 4,
          },
        ],
      },
    });
    console.log('Allllllllllllllllllllllll', allBookings);
    allBookings
      .map(booking => {
        Booking.update(
          {
            isAccepted: 2,
          },
          {
            where: {
              id: booking.id,
            },
          }
        );
      })
      .then(() => {
        res.status(200).json('Booking successfully cancelled');
      });
  } catch (err) {
    res.status(500).json(err);
  }
};
