<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="/">
        <img id="logo" src="./assets/logo.png">
        <h1 id="title">Date Ideas</h1>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/browse">Browse</b-nav-item>
          <b-nav-item to="/ideas">Your Ideas</b-nav-item>
          <b-nav-item to="/saved">Saved Ideas</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
    <div class='footer'>
      <div class="footer-container">
        <div class='footer-discription'>Bradley Taylor</div>
        <div class='footer-discription divider'>|</div>
        <div class='footer-discription'>Web Design Project March 2020</div>
        <div class='footer-discription divider'>|</div>
        <div class='footer-discription'>
          <a class='con-link' href="https://github.com/Bradley-A-Taylor/cp3">GitHub Repository</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#logo {
  max-height: 80px;
  margin-bottom: 0.5rem;
  padding-left: 10px;
}

#title{
  font-size: 42px;
  padding-left: 20px;
  position: absolute;
  top: 25px;
  left: 100px;
}
#nav-collapse{
  padding-right: 50px;
}

.footer{
    position: absolute;
    width: 100%;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 4em;
    color: #FFF;
    background-color: #17a2b8;
  }
.footer-container{
  width:75%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.footer-discription{
  font-size: .74rem;
  font-weight: 500;
  line-height: 1.5;
  text-align: center;
}
.divider{
  font-size: .9rem;
  padding-left: 20px;
  padding-right: 20px;
}
.con-link:link,
.con-link:visited{
  text-decoration: underline;
  color: #FFF;
  /* text-decoration-color: #17a2b8; */
}
.con-link:hover,
.con-link:active{
  color: rgba(0,0,0,.4);
  text-decoration: underline;
}
</style>
