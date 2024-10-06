
let allCardLoad = async () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("daynamic-div1").classList.remove("hidden");
  document.getElementById("daynamic-div2").classList.remove("hidden");
  let response = await fetch(`https://openapi.programming-hero.com/api/peddy/pets`);
  let data = response. json();

  setTimeout(() => {
      displayAllPets(data.pets);
      document.getElementById("loader").classList.add("hidden");
      document.getElementById("daynamic-div1").classList.add("hidden");
      document.getElementById("daynamic-div2").classList.add("hidden");
    }, 2000);
  };
  allCardLoad();


let categoriesBtnLoad = async () => {
    let response = await fetch(
      "https://openapi.programming-hero.com/api/peddy/categories"
    );
    let data = await response.json();
    displayCategoryBtn(data.categories);
  };
  categoriesBtnLoad();
  
  
  let displayCategoryBtn = (categoryBtn) => {
    let btnContainer = document.getElementById("btn-container");
    categoryBtn.forEach((element) => {
      let btn = document.createElement("button");
      btn.innerHTML = `
      <button onclick="loadCategoryCard('${element.category}')" class="w-full py-4 rounded-lg border border-[#0E7A81] border-opacity-20 bg-white hover:bg-white flex items-center justify-center gap-2 ">
                <img class="w-10" src="${element.category_icon}" alt="">
                <p class="font-extrabold text-lg text-black">${element.category}</p>
              </button>
      `;
      btnContainer.append(btn);
    });
  };

  let modalOpener = async (id) => {
    let response = await fetch(
     `https://openapi.programming-hero.com/api/peddy/pet/${id}`
    );
    let data = await response.json();
    let petsArray = data.petData;
    let modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
    <dialog id="my_modal_1" class="modal">
            <div class="modal-box p-5 flex flex-col">
              <div class="w-full h-[250px]">
                <img class="w-full h-full rounded-xl" src="${petsArray.image}" alt="">
              </div>
              <div class="mt-4">
                  <h2 class="font-extrabold text-xl text-black mb-2">${
                    petsArray.pet_name
                  }</h2>
                  <div class="flex gap-5">
                    <div>
                      <p class="text-base text-gray-400"><i class="fa-solid fa-grip-vertical"></i>&nbsp; Breed: ${
                        petsArray.breed ? `${petsArray.breed}` : "Uknown"
                      }</p>
                    <p class="text-base text-gray-400"><i class="fa-solid fa-mercury"></i>&nbsp; Gender: ${
                      petsArray.gender ? `${petsArray.gender}` : "Uknown"
                    }</p>
                    <p class="text-base text-gray-400"><i class="fa-solid fa-mercury"></i>&nbsp; Vaccinated status: ${
                      petsArray.vaccinated_status
                        ? `${petsArray.vaccinated_status}`
                        : "Uknown"
                    }</p>
                    </div>
                    <div>
                      <p class="text-base text-gray-400"><i class="fa-regular fa-calendar"></i>&nbsp; Birth: ${
                        petsArray.date_of_birth
                          ?`${petsArray.date_of_birth}`
                          : "Uknown"
                      }</p>
                    <p class="text-base text-gray-400"><i class="fa-solid fa-dollar-sign"></i>&nbsp; Price:&nbsp;<span>${
                      petsArray.price ? `${petsArray.price}` : "0"
                    }</span>&nbsp;<i class="fa-solid fa-dollar-sign text-sm"></i></p>
                    </div>
                  </div>
              </div>
              <hr class="border mt-3 bottom-1 border-gray-400 border-opacity-20">
              <!-- pet desciption div -->
               <div class="mt-4">
                <h2 class="font-extrabold text-lg text-black">Details information</h2>
                <div class="text-base">
                  <p>${
                    petsArray.pet_details
                      ? `${petsArray.pet_details}`
                      : "NO details Availabel"
                  }</p>
                </div>
               </div>
              <div class="modal-action">
  
                <form method="dialog" class="w-full items-center flex justify-center">
                  <button class="btn w-full font-bold text-lg bg-[#0E7A81] bg-opacity-15 hover:bg-[#0E7A81] hover:bg-opacity-10 text-[#0E7A81] border border-[#0E7A81] border-opacity-20">Close</button>
                </form>
              </div>
            </div>
          </dialog>
    `
    my_modal_1.showModal()
                };

    let loadCategoryCard = async (id) => {
        let response = await fetch(
          `https://openapi.programming-hero.com/api/peddy/category/${id}`
        );
        let data = await response.json();
        setTimeout(() => {
          displayAllPets(data.data);
        }, 2000);
      };

      let displayAllPets = (petsArr) => {

        let cardContainer = document.getElementById("card-container");
        cardContainer.innerHTML = "";
        if (petsArr.length === 0) {
          cardContainer.classList.remove("grid");
          cardContainer.innerHTML = `
                    <div class="flex flex-col bg-purple-200 py-16 rounded-lg items-center justify-center text-center">
                  <img class="" src="images/error.webp" alt="">
                  <h2 class=" font-extrabold text-2xl text-black ">No Information Available</h2>
                  <p class=" font-bold text-sm">We're sorry, but the item you're trying to purchase is <br> currently out of stock or unavailable.</p>
                </div>
          `;
        } else {
          cardContainer.classList.add("grid");
        }
        petsArr.forEach((pet) => {
            console.log(pet);

            let card = document.createElement("div");
            card.innerHTML=`<div class="card border border-gray-300 rounded-lg p-4">
            <figure class="">
            <img src="${pet.image}" alt="Shoes" class="rounded-xl" /> 
            </figure>
          <div class=" mt-4">
          <h2 class="font-extrabold text-xl text-black mb-2">${
            pet.pet_name
          } </h2>
          <p class="text-base text-gray-400"><i class="fa-solid fa-grip-vertical"></i>; Breed: ${pet.breed? `${pet.breed}` : "Uknown"}</p>
          <p class="text-base text-gray-400"><i class="fa-regular fa-calendar"></i>&nbsp; Birth: ${ pet.date_of_birth ? `${pet.date_of_birth}` : "Uknown"}</p>
          <p class="text-base text-gray-400"><i class="fa-solid fa-dollar-sign"></i>&nbsp; Price:&nbsp;<span>${
                          pet.price ? `${pet.price} `: "0"
                        }</span>&nbsp;<i class="fa-solid fa-dollar-sign text-sm"></i></p>
                        <hr class="border bottom-1 mt-3 border-gray-400 border-opacity-20">
                        <div class="flex justify-between items-center mt-3">
                          <button onclick="sideDivImgShow('${pet.image}')" class="btn bg-white hover:bg-white border border-1 border-[#0E7A81] border-opacity-20"><i class="fa-regular fa-thumbs-up"></i>
                          </button>

                          <button onclick="my_modal_5.showModal()" class="btn bg-white hover:bg-white border border-1 font-bold text-base border-[#0E7A81] border-opacity-20">Adopt</button>

                          <button onclick="modalOpener('${pet.petId}')" class="btn bg-white hover:bg-white border border-1 
                          border-[#0E7A81] border-opacity-20 font-bold text-base">Details</i>
                          </button>
                        </div>
                      </div>
                    </div>`;

                    cardContainer.append(card);
                });
            };

            let sideDivImgShow= (image)=>{
                let sideDiv = document.getElementById('photo-show');
                let photo = document.createElement('div');
                photo.innerHTML = `
                <div>
                <img class="rounded-xl w-full" src ="${image}" alt="">
                </div>
                `
                sideDiv.appendChild(photo);
              }
              
             