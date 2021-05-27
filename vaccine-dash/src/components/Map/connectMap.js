import React, { createContext } from 'react';
const { Consumer, Provider } = createContext('leaflet-map');

const connectMap = Component => {
  class Connected extends React.Component {
    displayName = `ConnectMap(${Component.displayName})`;

    renderMap = ({ map }) => <Component {...this.props} map={map} />;

    render() {
      return <Consumer>{this.renderMap}</Consumer>;
    }
  }

  return Connected;
};

export { Consumer, Provider };
export default connectMap;
