<template>
  <main>
    <div id="title">
      <h1 class="text-main-title">
        RedBit
      </h1>
    </div>
    <div id="featureList">
      <img src="/img/svg/waves/wave1.svg" alt="">
      <div class="flex-around">
        <BasicShowcaseCard />
        <BasicShowcaseCard />
        <BasicShowcaseCard />
      </div>
    </div>
    <div id="about">
      <img src="/img/svg/waves/wave2.svg" alt="">
      <span class="text text-big">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat corporis incidunt aliquid nemo doloremque
        explicabo culpa eos inventore sunt recusandae odit dolor reiciendis dicta soluta consequatur nihil, quidem
        eligendi deserunt.
      </span>
    </div>
    <div id="developers">
      <img src="/img/svg/waves/wave3.svg" alt="">
      <h2 class="text-title">Developer team</h2>

      <div class="flex-around">
        <BasicShowcaseCard />
        <BasicShowcaseCard />
        <BasicShowcaseCard />
      </div>

    </div>
    <div id="footer">
      <img src="/img/svg/waves/wave4.svg" alt="">
      <div class="flex-around">
        <div>
          <ul>
            <h3 class="text-big tect-bold">Stuff used</h3>
            <li>key packages</li>
            <li>hosting</li>
            <li>db</li>
          </ul>
        </div>
        <div>
          <div>
            <a class="text-big" href="https://github.com/RedBit-devs/RedBit" target="_blank">GitHub</a>
          </div>
          <div>
            <ul>
              <li>idk</li>
              <li>what</li>
              <li>asd</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;

  text-align: center;
}

main>div {
  display: grid;
  justify-items: center;
}

main>div>div {
  padding: 2rem;
}

main>div>img {
  width: 100%;
}

#title {
  background: var(--clr-tertiary);
  place-content: center;
}

#featureList {
  background-color: var(--clr-primary);
  grid-template-rows: repeat(2, 1fr);
}

#about {
  background-color: var(--clr-ui-primary);
}

#developers {
  background-color: var(--clr-secondary);
}

#footer {
  background-color: var(--clr-ui-tertiary);
}

.flex-around {
  padding-inline: 10%;
  width: 100%;
  gap: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

</style>