// Compound Components

import React from 'react'
import {Switch} from '../switch'

class Toggle extends React.Component {
  // you can create function components as static properties!
  // for example:
  // static Candy = (props) => <div>CANDY! {props.children}</div>
  // Then that could be used like: <Toggle.Candy />
  // This is handy because it makes the relationship between the
  // parent Toggle component and the child Candy component more explicit
  // 🐨 You'll need to create three such components here: On, Off, and Button
  //    The button will be responsible for rendering the <Switch /> (with the right props)
  // 💰 Combined with changes you'll make in the `render` method, these should
  //    be able to accept `on`, `toggle`, and `children` as props.
  //    Note that they will _not_ have access to Toggle instance properties
  //    like `this.state.on` or `this.toggle`.
  static On = (props) => (props.on ? props.children : null)
  static Off = (props) => (props.on ? null : props.children)
  static Button = ({ on, toggle }) => <Switch on={on} onClick={toggle} />

  state = {on: false}

  toggle = () =>
    this.setState(
      ({on}) => ({on: !on}),
      () => this.props.onToggle(this.state.on),
    )
  render() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle,
      });
    });
  }
}

// 💯 Support rendering non-Toggle components within Toggle without incurring warnings in the console.
// for example, try to render a <span>Hello</span> inside <Toggle />

// Don't make changes to the Usage component. It's here to show you how your
// component is intended to be used and is used in the tests.
// You can make all the tests pass by updating the Toggle component.
// @TODO: Anthony - this is cool as fuck
function Usage({
  onToggle = (...args) => console.log('onToggle', ...args),
}) {
  return (
    <Toggle onToggle={onToggle}>
      <Toggle.On>The button is on</Toggle.On>
      <Toggle.Off>The button is off</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  )
}
Usage.title = 'Compound Components'

export {Toggle, Usage as default}
