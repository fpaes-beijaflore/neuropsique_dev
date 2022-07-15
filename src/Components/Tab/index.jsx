import { Tab, Tabs } from 'react-bootstrap';

import { useState } from 'react';

const TabComp = ({ defaultActive, tabList, ...others }) => {
  const [key, setKey] = useState(defaultActive);
  const id = `tabs-${Math.random()}-${Math.random()}`;

  return (
    <Tabs
      id={id}
      mountOnEnter
      unmountOnExit
      activeKey={key}
      onSelect={(k) => setKey(k)}
      {...others}
    >
      {tabList.map(({ key, Comp, ...others }, index) => (
        <Tab {...others} eventKey={index} key={index}>
          {typeof Comp === 'function' ? <Comp /> : Comp}
        </Tab>
      ))}
    </Tabs>
  );
};

TabComp.defaultProps = {
  defaultActive: 0,
  tabList: [],
};

export default TabComp;
