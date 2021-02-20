import * as React from 'react';
import PropTypes from 'prop-types';
import { FAB, Portal, Provider } from 'react-native-paper';
import { colors } from '../utils/colors';

const FabButton = (props) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Provider>
      <Portal>
        <FAB.Group
          open={open}
          icon={open ? 'close' : 'camera'}
          actions={props.actions}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
          color={colors.darkBlue}
          fabStyle={{backgroundColor: colors.lightGreen}}
        />
      </Portal>
    </Provider>
  );
};

FabButton.propTypes = {
  actions: PropTypes.array.isRequired,
}

export default FabButton;