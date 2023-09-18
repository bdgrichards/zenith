import React from "react";

export class PyScript extends React.Component {
  render() {
    // @ts-ignore
    return React.createElement("py-script", null, this.props.childre);
  }
}
