<template>
  <main>
    <section id="title">
      <h1 class="text-main-title">
        RedBit
      </h1>
      <h2 id="slogan"><q>The place of the slogan</q></h2>
    </section>
    <section id="featureList">
      <img src="/img/svg/waves/wave1.svg" alt="">
      <div class="flex-around">
        <BasicShowcaseCard :card-data="featurecard1" />
        <BasicShowcaseCard :card-data="featurecard1" />
        <BasicShowcaseCard :card-data="featurecard1" />
      </div>
    </section>
    <section id="about">
      <img src="/img/svg/waves/wave2.svg" alt="">
      <span class="text text-big">
        <strong>RedBit</strong> is a free and <u>open-source</u> communication platform that lets you chat with friends,
        family, and
        communities. With features direct messaging, and group chats, RedBit provides a
        seamless way to connect with others, no matter where they are.
      </span>
    </section>
    <section id="developers">
      <img src="/img/svg/waves/wave3.svg" alt="">
      <h2 class="text-title">Developer team</h2>

      <div class="flex-around">
        <BasicShowcaseCard :card-data="developercard1" />
        <BasicShowcaseCard :card-data="developercard1" />
        <BasicShowcaseCard :card-data="developercard1" />
      </div>

    </section>
    <footer>
      <img src="/img/svg/waves/wave4.svg" alt="">
      <div>
        <dir id="list1">
          <h3 class="text-medium">Keypackages</h3>
          <p>
            <a href="https://www.prisma.io/">Prisma </a>
            <a href="https://nuxt.com/modules/prisma">[nuxt pkg]</a>
          </p>
          <a href="https://nuxt.com/">NUXT</a>
        </dir>
        <dir id="github">
          <a class="text-big" href="https://github.com/RedBit-devs/RedBit" target="_blank">Project GitHub</a>
        </dir>
        <dir id="list2">

          <h3 class="text-medium">Links</h3>
          <p>services</p>
          <p>hosting</p>
          <a href="https://supabase.com/">Supabase</a>
        </dir>
      </div>
    </footer>
  </main>
</template>

<script lang="ts" setup>
//Some template data to modify in the future
const featurecard1: CardData = {
  imageUrl: "icon:mdi:lightning-bolt",
  headerText: "Fast",
  description: "Lorem psum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
}
const developercard1: CardData = {
  imageUrl: "https://picsum.photos/300",
  headerText: "Lajos",
  bubbles: [
    {
      name: "picssum",
      imageUrl: "https://picsum.photos/100",
      url: "https://picsum.photos/"
    },
    {
      name: "picssum",
      imageUrl: "https://picsum.photos/100",
      url: "https://picsum.photos/"
    },
  ],
  description: "Lorem ipsum dolor ametLorem ipsum dolor ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit amet"
}


</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;

  text-align: center;
}

main>section,
main>footer {
  display: grid;
  justify-items: center;
}

main>section>div,
main>section>span,
main>footer>div {
  padding: 2rem 4rem;
}

main>section>img,
main>footer>img {
  width: 100%;
}

#title {
  background: var(--clr-tertiary);
  place-content: center;
}

#slogan {
  font-family: Inter-Italic;
  font-weight: lighter;
}


#featureList {
  background-color: var(--clr-primary);
}

#about {
  background-color: var(--clr-ui-primary);
}

#developers {
  background-color: var(--clr-secondary);
}

footer {
  background-color: var(--clr-ui-tertiary);
  text-align: left
}

footer>div {
  display: grid;
  grid-template-areas: "list1 github list2";
  grid-template-rows: fit-content 1fr;
  gap: 0rem 4rem;

}

footer dir {
  padding: 1rem;
}

footer h3 {
  position: relative;
}

footer h3::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -0.2em;
  height: .15em;
  width: 100%;
  background-color: currentColor;
}

footer p {
  line-height: 2rem;
}

footer #list1 {
  grid-area: list1;
  grid-row: span 2;
}

footer #list2 {
  grid-area: list2;
}

footer #github {
  grid-area: github;
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