<template>
  <v-app id="app">
    <h1>Contagion of the coronavirus in Switzerland</h1>
    <h2>Comparing the situation with Italy</h2>
    <p>
      This graph compares the amount of
      <strong>cases per million inhabitants</strong>.<br />
      It starts on the first day when there was more than 1 in 1'000'000
      inhabitants that was infected.
    </p>
    <p>Day 1 Switzerland: 27.02.20<br />Day 1 Italy: 22.02.20</p>
    <Capita />
    <h2>Number of cases in Switzerland</h2>
    <!-- <p>
      <strong>
        The
        <a
          href="https://www.bag.admin.ch/bag/de/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/novel-cov.html"
          target="_blank"
          >BAG/OFSP</a
        >
        isn't communicating the amount of cases per cantons in Switzerland
        anymore.
      </strong>
    </p> -->
    <Data />
    <footer>
      <p>
        <i><strong>Sources:</strong></i>
      </p>
      <ul>
        <li>
          <a
            href="https://www.bag.admin.ch/bag/de/home/krankheiten/ausbrueche-epidemien-pandemien/aktuelle-ausbrueche-epidemien/novel-cov.html"
            >BAG/OFSP
          </a>
        </li>
        <li>
          <a href="https://interactif.tdg.ch/2020/covid-19-carte-suisse/"
            >Tribune de Genève</a
          >
        </li>
        <li>
          <a href="https://github.com/techengines/coronavirus-stats-italy"
            >TechEngines.AI</a
          >
        </li>
        <li>
          <a href="https://www.worldometers.info/coronavirus/">Worldometer</a>
        </li>
      </ul>
      <div class="bottom">
        <a class="contact" href="mailto:thomas.miller147@gmail.com">email</a>
        <a href="https://github.com/Meuss/contagion-coronavirus" class="github">
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>
      </div>
      <p>
        <i>Last updated: {{ timestamp }}</i>
      </p>
    </footer>
  </v-app>
</template>

<script>
import Data from "./components/Data.vue";
import Capita from "./components/Capita.vue";
import moment from "moment";
export default {
  name: "App",
  data() {
    return {
      timestamp: null
    };
  },
  components: {
    Data,
    Capita
  },
  mounted() {
    this.timestamp = moment(
      document.documentElement.dataset.buildTimestampUtc
    ).fromNow();
  }
};
</script>

<style lang="scss">
html {
  height: 100%;
}
body {
  background-color: #edf2f4;
  min-height: 100%;
  margin: 0;
}
#app {
  // background-image: url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M82.42 180h-1.415L0 98.995v-2.827L6.167 90 0 83.833V81.004L81.005 0h2.827L90 6.167 96.167 0H98.996L180 81.005v2.827L173.833 90 180 96.167V98.996L98.995 180h-2.827L90 173.833 83.833 180H82.42zm0-1.414L1.413 97.58 8.994 90l-7.58-7.58L82.42 1.413 90 8.994l7.58-7.58 81.006 81.005-7.58 7.58 7.58 7.58-81.005 81.006-7.58-7.58-7.58 7.58zM175.196 0h-25.832c1.033 2.924 2.616 5.59 4.625 7.868C152.145 9.682 151 12.208 151 15c0 5.523 4.477 10 10 10 1.657 0 3 1.343 3 3v4h16V0h-4.803c.51.883.803 1.907.803 3 0 3.314-2.686 6-6 6s-6-2.686-6-6c0-1.093.292-2.117.803-3h10.394-13.685C161.18.938 161 1.948 161 3v4c-4.418 0-8 3.582-8 8s3.582 8 8 8c2.76 0 5 2.24 5 5v2h4v-4h2v4h4v-4h2v4h2V0h-4.803zm-15.783 0c-.27.954-.414 1.96-.414 3v2.2c-1.25.254-2.414.74-3.447 1.412-1.716-1.93-3.098-4.164-4.054-6.612h7.914zM180 17h-3l2.143-10H180v10zm-30.635 163c-.884-2.502-1.365-5.195-1.365-8 0-13.255 10.748-24 23.99-24H180v32h-30.635zm12.147 0c.5-1.416 1.345-2.67 2.434-3.66l-1.345-1.48c-1.498 1.364-2.62 3.136-3.186 5.14H151.5c-.97-2.48-1.5-5.177-1.5-8 0-12.15 9.84-22 22-22h8v30h-18.488zm13.685 0c-1.037-1.793-2.976-3-5.197-3-2.22 0-4.16 1.207-5.197 3h10.394zM0 148h8.01C21.26 148 32 158.742 32 172c0 2.805-.48 5.498-1.366 8H0v-32zm0 2h8c12.15 0 22 9.847 22 22 0 2.822-.53 5.52-1.5 8h-7.914c-.567-2.004-1.688-3.776-3.187-5.14l-1.346 1.48c1.09.99 1.933 2.244 2.434 3.66H0v-30zm15.197 30c-1.037-1.793-2.976-3-5.197-3-2.22 0-4.16 1.207-5.197 3h10.394zM0 32h16v-4c0-1.657 1.343-3 3-3 5.523 0 10-4.477 10-10 0-2.794-1.145-5.32-2.992-7.134C28.018 5.586 29.6 2.924 30.634 0H0v32zm0-2h2v-4h2v4h4v-4h2v4h4v-2c0-2.76 2.24-5 5-5 4.418 0 8-3.582 8-8s-3.582-8-8-8V3c0-1.052-.18-2.062-.512-3H0v30zM28.5 0c-.954 2.448-2.335 4.683-4.05 6.613-1.035-.672-2.2-1.16-3.45-1.413V3c0-1.04-.144-2.046-.414-3H28.5zM0 17h3L.857 7H0v10zM15.197 0c.51.883.803 1.907.803 3 0 3.314-2.686 6-6 6S4 6.314 4 3c0-1.093.292-2.117.803-3h10.394zM109 115c-1.657 0-3 1.343-3 3v4H74v-4c0-1.657-1.343-3-3-3-5.523 0-10-4.477-10-10 0-2.793 1.145-5.318 2.99-7.132C60.262 93.638 58 88.084 58 82c0-13.255 10.748-24 23.99-24h16.02C111.26 58 122 68.742 122 82c0 6.082-2.263 11.636-5.992 15.866C117.855 99.68 119 102.206 119 105c0 5.523-4.477 10-10 10zm0-2c-2.76 0-5 2.24-5 5v2h-4v-4h-2v4h-4v-4h-2v4h-4v-4h-2v4h-4v-4h-2v4h-4v-2c0-2.76-2.24-5-5-5-4.418 0-8-3.582-8-8s3.582-8 8-8v-4c0-2.64 1.136-5.013 2.946-6.66L72.6 84.86C70.39 86.874 69 89.775 69 93v2.2c-1.25.254-2.414.74-3.447 1.412C62.098 92.727 60 87.61 60 82c0-12.15 9.84-22 22-22h16c12.15 0 22 9.847 22 22 0 5.61-2.097 10.728-5.55 14.613-1.035-.672-2.2-1.16-3.45-1.413V93c0-3.226-1.39-6.127-3.6-8.14l-1.346 1.48C107.864 87.987 109 90.36 109 93v4c4.418 0 8 3.582 8 8s-3.582 8-8 8zM90.857 97L93 107h-6l2.143-10h1.714zM80 99c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm20 0c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6z' fill='%232b2d42' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
  background-color: #f0f0f0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2b2d42;
  padding: 40px 25% 10px 25%;
  @media (max-width: 1300px) {
    padding: 40px 15% 10px 15%;
  }
  @media (max-width: 900px) {
    padding: 40px 5% 10px 5%;
  }
  @media (max-width: 500px) {
    padding: 30px 10px 10px 10px;
    text-align: left;
  }
}
h1 {
  font-size: 1.7em;
  margin-top: 0;
  @media (max-width: 500px) {
    font-size: 1.5em;
  }
}
h2 {
  margin-top: 3.5rem;
  margin-bottom: 1rem;
  text-decoration: underline;
  @media (max-width: 500px) {
    font-size: 1.2em;
  }
}
.separator {
  height: 2px;
  background-color: rgba(43, 45, 66, 0.4);
  margin: 2em auto 2em auto;
}
.red {
  color: #ef233c;
}
.pulse {
  fill: #ef233c;
  animation-duration: 1s;
  animation-name: pulse;
  animation-iteration-count: infinite;
  transform-box: fill-box;
  transform-origin: center;
}
.skull {
  pointer-events: none;
}
@for $i from 1 through 40 {
  .pulse:nth-child(#{$i}n) {
    animation-delay: #{$i * 0.1}s;
  }
}
@keyframes pulse {
  from {
    transform: scale(1);
    opacity: 1;
  }
  to {
    transform: scale(1.7);
    opacity: 0;
  }
}
footer {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  p {
    margin: 0;
    i {
      font-size: 12px;
    }
  }
  ul {
    margin-top: 0;
    padding: 0 !important;
    list-style-type: none;
    line-height: 14px;
    a {
      color: #ef233c;
      font-size: 12px;
    }
  }
  .bottom {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    a.contact {
      color: #ef233c;
      font-size: 12px;
      margin-right: 10px;
    }
  }
  @media (max-width: 500px) {
    text-align: center;
    align-items: center;
    .bottom {
      justify-content: center;
    }
  }
}
.svg-wrapper {
  position: relative;
}
.death-div {
  width: 20px;
  height: 20px;
  position: absolute;
}
.github svg {
  margin-top: 5px;
  height: 25px;
  path {
    fill: #2b2d42;
  }
}
.tooltip .tooltip-inner {
  box-shadow: 0px 2px 5px #2b2d42;
  background: #f9f9f9;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2b2d42;
  border-radius: 6px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: #f9f9f9;
  z-index: 1;
}
.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}
.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}
.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, 0.1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden="true"] {
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.15s, visibility 0.15s;
}

.tooltip[aria-hidden="false"] {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.15s;
}
@media (min-width: 601px) {
  .v-application--is-ltr
    .v-slider--horizontal
    .v-slider__tick:first-child
    .v-slider__tick-label {
    transform: translateX(-50%) !important;
  }
  .v-application--is-ltr
    .v-slider--horizontal
    .v-slider__tick:last-child
    .v-slider__tick-label {
    transform: translateX(-50%) !important;
  }
}
</style>
