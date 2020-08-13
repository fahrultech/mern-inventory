import React from "react";

const Header = () => {
  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="text-center">
          <a href="/#" className="logo">
            <img src="/images/logo.png" alt="logo-img" />
          </a>
          <a href="/#" className="logo-sm">
            <img src="/images/logo_sm.png" alt="logo-img" />
          </a>
        </div>
      </div>
      <div className="navbar navbar-default" role="navigation">
        <div className="container">
          <div className="">
            <div className="pull-left">
              <button
                type="button"
                className="button-menu-mobile open-left waves-effect waves-light"
              >
                <i className="ion-navicon"></i>
              </button>
              <span className="clearfix"></span>
            </div>
            <form className="navbar-form pull-left" role="search">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control search-bar"
                  placeholder="Search..."
                />
              </div>
              <button type="submit" className="btn btn-search">
                <i className="fa fa-search"></i>
              </button>
            </form>

            <ul className="nav navbar-nav navbar-right pull-right">
              <li className="dropdown hidden-xs">
                <a
                  href="/#"
                  data-target="#"
                  className="dropdown-toggle waves-effect waves-light notification-icon-box"
                  data-toggle="dropdown"
                  aria-expanded="true"
                >
                  <i className="fa fa-bell"></i>{" "}
                  <span className="badge badge-xs badge-danger"></span>
                </a>
                <ul className="dropdown-menu dropdown-menu-lg noti-list-box">
                  <li className="text-center notifi-title">
                    Notification{" "}
                    <span className="badge badge-xs badge-success">3</span>
                  </li>
                  <li className="list-group">
                    <a href="/#" className="list-group-item">
                      <div className="media">
                        <div className="media-heading">Your order is placed</div>
                        <p className="m-0">
                          <small>
                            Dummy text of the printing and typesetting industry.
                          </small>
                        </p>
                      </div>
                    </a>
                    <a href="/#" className="list-group-item">
                      <div className="media">
                        <div className="media-body clearfix">
                          <div className="media-heading">New Message received</div>
                          <p className="m-0">
                            <small>You have 87 unread messages</small>
                          </p>
                        </div>
                      </div>
                    </a>
                    <a href="/#;" className="list-group-item">
                      <div className="media">
                        <div className="media-body clearfix">
                          <div className="media-heading">Your item is shipped.</div>
                          <p className="m-0">
                            <small>
                              It is a long established fact that a reader will
                            </small>
                          </p>
                        </div>
                      </div>
                    </a>
                    <a href="/#" className="list-group-item">
                      <small className="text-primary">See all notifications</small>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="hidden-xs">
                <a
                  href="/#"
                  id="btn-fullscreen"
                  className="waves-effect waves-light notification-icon-box"
                >
                  <i className="mdi mdi-fullscreen"></i>
                </a>
              </li>
              <li className="dropdown">
                <a
                  href="/#"
                  className="dropdown-toggle profile waves-effect waves-light"
                  data-toggle="dropdown"
                  aria-expanded="true"
                >
                  <img
                    src="/images/users/avatar-1.jpg"
                    alt="user-img"
                    className="img-circle"
                  />
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/#"> Profile</a>
                  </li>
                  <li>
                    <a href="/#">
                      <span className="badge badge-success pull-right">5</span>{" "}
                      Settings{" "}
                    </a>
                  </li>
                  <li>
                    <a href="/#"> Lock screen</a>
                  </li>
                  <li className="divider"></li>
                  <li>
                    <a href="/#"> Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
