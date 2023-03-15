import React, { Component } from "react";
import Modal from './components/Modal';
import axios from "axios";
import RenderImages from "./components/RenderImages";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewPresenti: true,
      dataList: [],
      modal: false,
      activeItem: {
        name: "",
        age: "",
        presenza: false,
      },
    };
  }

  componentDidMount() {
    this.refreshList();
  }

  refreshList = () => {
    axios
      .get("http://localhost:8000/api/datas/")
      .then((res) => this.setState({ dataList: res.data }))
      .catch((err) => console.log(err));
  };

  toggle = () => {
    this.setState({ modal: !this.state.modal });
  };

  handleSubmit = (item) => {
    this.toggle();

    if (item.id) {
      axios
        .put(`http://localhost:8000/api/datas/${item.id}/`, item)
        .then((res) => this.refreshList());
      return;
    }
    axios
      .post("http://localhost:8000/api/datas/", item)
      .then((res) => this.refreshList());
  };

  handleDelete = (item) => {
    axios
    .delete(`http://localhost:8000/api/datas/${item.id}/`)
    .then((res) => this.refreshList());
  };

  createItem = () => {
    const item = { title: "", description: "", completed: false };

    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  editItem = (item) => {
    this.setState({ activeItem: item, modal: !this.state.modal });
  };

  displayPresenti = (status) => {
    if (status) {
      return this.setState({ viewPresenti: true });
    }

    return this.setState({ viewPresenti: false });
  };

  renderTabList = () => {
    return (
      <div className="nav nav-tabs">
        <span
          className={this.state.viewPresenti ? "nav-link active" : "nav-link"}
          onClick={() => this.displayPresenti(true)}
        >
          Presente
        </span>
        <span
          className={this.state.viewPresenti ? "nav-link" : "nav-link active"}
          onClick={() => this.displayPresenti(false)}
        >
          Non presente
        </span>
      </div>
    );
  };

  renderItems = () => {
    const { viewPresenti } = this.state;
    const newItems = this.state.dataList.filter(
      (item) => item.presenza === viewPresenti
    );

    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            this.state.viewPresenti ? "completed-todo" : ""
          }`}
          name={item.name}
        >
          {item.name}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => this.editItem(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => this.handleDelete(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    return (
      <main className="container">
        <h1 className="text-uppercase text-center my-4">Data</h1>
        <div className="row">
          <div className="col-md-6 col-sm-10 mx-auto p-0">
            <div className="card p-3">
              <div className="mb-4">
                <button
                  className="btn btn-primary"
                  onClick={this.createItem}
                >
                  Add
                </button>
              </div>
              {this.renderTabList()}
              <ul className="list-group list-group-flush border-top-0">
                {this.renderItems()}
              </ul>
            </div>
          </div>
        </div>
        {this.state.modal ? (
          <Modal
            activeItem={this.state.activeItem}
            toggle={this.toggle}
            onSave={this.handleSubmit}
          />
        ) : null}
        <RenderImages />
      </main>
    );
  }
}

export default App;

