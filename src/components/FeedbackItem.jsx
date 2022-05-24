import PropTypes from 'prop-types'; /* impt */

import Card from './shared/Card';

const FeedbackItem = ({
  item
}) => {

  return (
    <Card>
      <div className="num-display">{item.rating}</div>
      <div className="text-display">{item.text}</div>
    </Card>
  )
}

FeedbackItem.protoTypes = {
  item: PropTypes.object.isRequired
}

export default FeedbackItem;