const React = require('react');
const ReduxDevtools = require('redux-devtools');
const DockMonitor = require('redux-devtools-dock-monitor').default;
const LogMonitor = require('redux-devtools-log-monitor').default;

/**
 * Redux development tools (useful for debugging).
 */
module.exports = ReduxDevtools.createDevTools(
  <DockMonitor toggleVisibilityKey="h" changePositionKey="q" defaultIsVisible={false}>
    <LogMonitor />
  </DockMonitor>
);
