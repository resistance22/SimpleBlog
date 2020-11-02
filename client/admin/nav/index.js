import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import CircularProgress from '@material-ui/core/CircularProgress'
import { logout } from '../../redux/auth/actions'
import {
  openDrawer,
  closeDrawer,
  startLoading,
  finishLoading
} from '../../redux/adminPanel/actions'

class Nav extends Component {
  constructor () {
    super()

    this.logoutClick = this.logoutClick.bind(this)
    this.toggleDrawer = this.toggleDrawer.bind(this)
  }

  logoutClick (e) {
    e.preventDefault()
    const { logout } = this.props
    logout()
    // eslint-disable-next-line no-undef
    localStorage.removeItem('token')
  }

  toggleDrawer (e) {
    const { drawerOpen, openDrawer, closeDrawer } = this.props
    if (e && e.type === 'keydown' && (e.key === 'Escape')) {
      return closeDrawer()
    }
    drawerOpen ? closeDrawer() : openDrawer()
  }

  render () {
    const { loading } = this.props
    return (
      <nav className="navigation">

        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.toggleDrawer} edge="start" color="inherit" aria-label="menu">
              <MenuIcon />
            </IconButton>
            <p>{this.props.username}</p>
            {loading && (<CircularProgress color="secondary" />)}
          </Toolbar>
        </AppBar>
        <Drawer
          anchor='left'
          open={this.props.drawerOpen}
          onKeyDown={this.toggleDrawer}
        >
          <div className="inside drawer" onClick={this.toggleDrawer}>
            <List>
              <ListItem>
                <Link to='/profile'>Profile</Link>
              </ListItem>
              <Divider />
              <ListItem>
                <Link to='/profile/posts'>All Posts</Link>
              </ListItem>
              <Divider />
              <ListItem>
                <a onClick={this.logoutClick} href="#">Logout</a>
              </ListItem>
              <Divider />
            </List>
          </div>

        </Drawer>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    drawerOpen: state.adminPanel.drawerOpen,
    loading: state.adminPanel.loading,
    username: state.auth.user.username
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    openDrawer: () => dispatch(openDrawer()),
    closeDrawer: () => dispatch(closeDrawer()),
    startLoading: () => dispatch(startLoading()),
    finishLoading: () => dispatch(finishLoading())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
