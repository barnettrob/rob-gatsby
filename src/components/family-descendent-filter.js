import React from "react";

class DescendentFilter extends React.Component {
  render() {
    const filter = this.props.filter;
    const checkboxName = `${filter.name}-${filter.nid}`;

    return (
      <div className="ml-4">
      <label>
        <input
          name={checkboxName}
          type="checkbox"
          className="form-check-input"
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        {filter.label}
      </label>
      </div>
    )
  }
};

export default DescendentFilter