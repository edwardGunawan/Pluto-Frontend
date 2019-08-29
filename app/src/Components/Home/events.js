import moment from 'moment';
let i = 0;
export default [
    {
      'title': 'Meeting',
      'id': i++,
      'allDay': false,
      'start': new Date(2019,8,31),
      'end': new Date(2019,9,1)
    },
    {
      'title': 'All Day Event very long title',
      'id': i++,
      'allDay': true,
      'start': new Date(2019, 3, 0),
      'end': new Date(2019, 3, 1)
    },
    {
      'title': 'Long Event',
      'id': i++,
      'start': new Date(2019, 3, 7),
      'end': new Date(2019, 3, 10)
    },
  
    {
      'title': 'DTS STARTS',
      'id': i++,
      'start': new Date(2020, 2, 13, 0, 0, 0),
      'end': new Date(2020, 2, 20, 0, 0, 0)
    },
  
    {
      'title': 'DTS ENDS',
      'id': i++,
      'start': new Date(2020, 10, 6, 0, 0, 0),
      'end': new Date(2020, 10, 13, 0, 0, 0)
    },
  
    {
      'title': 'Some Event',
      'id': i++,
      'start': new Date(2019, 3, 9, 0, 0, 0),
      'end': new Date(2019, 3, 9, 0, 0, 0)
    },
    {
      'title': 'Conference',
      'id': i++,
      'start': new Date(2019, 3, 11),
      'end': new Date(2019, 3, 13),
      desc: 'Big conference for important people'
    },
    {
      'title': 'Meeting',
      'id': i++,
      'start': new Date(2019, 3, 12, 10, 30, 0, 0),
      'end': new Date(2019, 3, 12, 12, 30, 0, 0),
      desc: 'Pre-meeting meeting, to prepare for the meeting'
    },
    {
      'title': 'Lunch',
      'id': i++,
      'start': new Date(2019, 3, 12, 12, 0, 0, 0),
      'end': new Date(2019, 3, 12, 13, 0, 0, 0),
      desc: 'Power lunch'
    },
    {
      'title': 'Meeting',
      'id': i++,
      'start': new Date(2019, 3, 12, 14, 0, 0, 0),
      'end': new Date(2019, 3, 12, 15, 0, 0, 0)
    },
    {
      'title': 'Happy Hour',
      'id': i++,
      'start': new Date(2019, 3, 12, 17, 0, 0, 0),
      'end': new Date(2019, 3, 12, 17, 30, 0, 0),
      desc: 'Most important meal of the day'
    },
    {
      'title': 'Dinner',
      'id': i++,
      'start': new Date(2019, 3, 12, 20, 0, 0, 0),
      'end': new Date(2019, 3, 12, 21, 0, 0, 0)
    },
    {
      'title': 'Birthday Party',
      'id': i++,
      'start': new Date(2019, 3, 13, 7, 0, 0),
      'end': new Date(2019, 3, 13, 10, 30, 0)
    },
    {
      'title': 'Birthday Party 2',
      'id': i++,
      'start': new Date(2019, 3, 13, 7, 0, 0),
      'end': new Date(2019, 3, 13, 10, 30, 0)
    },
    {
      'title': 'Birthday Party 3',
      'id': i++,
      'start': new Date(2019, 3, 13, 7, 0, 0),
      'end': new Date(2019, 3, 13, 10, 30, 0)
    },
    {
      'title': 'Late Night Event',
      'id': i++,
      'start': new Date(2019, 3, 17, 19, 30, 0),
      'end': new Date(2019, 3, 18, 2, 0, 0)
    },
    {
      'title': 'Multi-day Event',
      'id': i++,
      'start': new Date(2019, 3, 20, 19, 30, 0),
      'end': new Date(2019, 3, 22, 2, 0, 0)
    }
  ]
  