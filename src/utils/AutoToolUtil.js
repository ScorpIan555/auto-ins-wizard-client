const makeHelper = year => {
  const makes = {
    '2020': [
      'Acura',
      'Audi',
      'BMW',
      'Chevrolet',
      'Ford',
      'Honda',
      'Hyundai',
      'Jeep',
      'Kia',
      'Land Rover',
      'Lincoln',
      'Mercedes-Benz',
      'Nissan',
      'Porsche',
      'Toyota',
      'Other/Not Listed'
    ],
    '2010': [
      'Acura',
      'Audi',
      'BMW',
      'Chevrolet',
      'Ford',
      'Honda',
      'Hummer',
      'Hyundai',
      'Infiniti',
      'Jaguar',
      'Jeep',
      'Kia',
      'Land Rover',
      'Lincoln',
      'Mazda',
      'Mini',
      'Mitsubishi',
      'Mercedes-Benz',
      'Nissan',
      'Porsche',
      'Toyota',
      'Other/Not Listed'
    ],
    '2000': [
      'Acura',
      'Audi',
      'BMW',
      'Chevrolet',
      'Ford',
      'Honda',
      'Hummer',
      'Hyundai',
      'Infiniti',
      'Jaguar',
      'Jeep',
      'Kia',
      'Land Rover',
      'Lincoln',
      'Mazda',
      'Mini',
      'Mitsubishi',
      'Mercedes-Benz',
      'Nissan',
      'Porsche',
      'Toyota',
      'Other/Not Listed'
    ]
  };
  if (year > 2010 && year < 2021) {
    // console.log('2020 array:::', makes['2020']);
    return makes['2020'];
  }
  if (year > 2000 && year < 2011) {
    // console.log('2010 array:::', makes['2010']);
    return makes['2010'];
  }
  if (year > 1990 && year < 2001) {
    // console.log('2000 array:::', makes);
    return makes['2000'];
  }
};

const modelHelper = (year, make) => {
//   console.log('Year, Make::::', year, make);
  const models = {
    Acura: {
      '2020': [
        'Ilx',
        'MDX',
        'MDX Hybrid',
        'RDX',
        'RLX',
        'TLX',
        'Other/Not Listed'
      ],
      '2010': [],
      '2000': []
    },
    Audi: {
      '2020': [
        'Ilx',
        'MDX',
        'MDX Hybrid',
        'RDX',
        'RLX',
        'TLX',
        'Other/Not Listed'
      ],
      '2010': [],
      '2000': []
    },
    BMW: {
      '2020': [
        'Ilx',
        'MDX',
        'MDX Hybrid',
        'RDX',
        'RLX',
        'TLX',
        'Other/Not Listed'
      ],
      '2010': [],
      '2000': []
    },
    Chevrolet: {
      '2020': [
        'Ilx',
        'MDX',
        'MDX Hybrid',
        'RDX',
        'RLX',
        'TLX',
        'Other/Not Listed'
      ],
      '2010': [],
      '2000': []
    },
    Ford: {
      '2020': [
        'Ilx',
        'MDX',
        'MDX Hybrid',
        'RDX',
        'RLX',
        'TLX',
        'Other/Not Listed'
      ],
      '2010': [],
      '2000': []
    },
    Honda: {
      '2020': [
        'Ilx',
        'MDX',
        'MDX Hybrid',
        'RDX',
        'RLX',
        'TLX',
        'Other/Not Listed'
      ],
      '2010': [],
      '2000': []
    },
    Hummer: {
      '2020': [
        'Ilx',
        'MDX',
        'MDX Hybrid',
        'RDX',
        'RLX',
        'TLX',
        'Other/Not Listed'
      ],
      '2010': [],
      '2000': []
    }
  };

  if (year > 2010 && year < 2021) {
    // bind year range to an existing property name
    let yearRange = '2020';
    // console.log('modelHelper.withRange & MAKE:::', models[make][yearRange]);
    let modelsArray = models[make][yearRange];
    // pass the array with the user's selected model
    return modelsArray;
  }
  if (year > 2000 && year < 2011) {
    // bind year range to an existing property name
    let yearRange = '2010';
    // console.log('modelHelper.withRange & MAKE:::', models[make][yearRange]);
    let modelsArray = models[make][yearRange];
    // pass the array with the user's selected model
    return modelsArray;
  }
  if (year > 1990 && year < 2001) {
    // bind year range to an existing property name
    let yearRange = '2000';
    // console.log('modelHelper.withRange & MAKE:::', models[make][yearRange]);
    let modelsArray = models[make][yearRange];
    // pass the array with the user's selected model
    return modelsArray;
  }
};

export default { makeHelper, modelHelper };
