import React, {Component} from 'react';

class WrapperPage extends Component {
  render(props) {
    return <>{this.props.inner}</>;
  }
} 

export default WrapperPage;
