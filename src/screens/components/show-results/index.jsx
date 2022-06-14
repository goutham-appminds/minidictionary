import React, { memo, useMemo } from 'react';
import * as _ from 'lodash';
import PropTypes from 'prop-types';

import './styles.css';

function ShowResults({ meanings }) {
  const definations = useMemo(() => {
    const meaningsList = _.flatten(_.map(meanings, 'meanings'));
    const definationList = _.flatten(_.map(meaningsList, 'definitions'));
    return definationList;
  }, [meanings]);

  // To display the result of the searched word in list
  return (
    definations && definations.length && (
      <ul className="meanings-list">
        {
          definations.map(({ definition }, index) => <li key={index}>{definition}</li>)
        }
      </ul>
    )
  );
}

ShowResults.defaultProps = {
  meanings: [],
};

ShowResults.propTypes = {
  meanings: PropTypes.arrayOf(Object),
};

export default memo(ShowResults);
