const loadPhone = async (searchText = "a") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;

  displayPhones(phones);
};
displayPhones = (phones) => {
  // console.log(phones);
  const phoneCard = document.getElementById("phone-container");
  phoneCard.textContent = "";

  const showAllDiv = document.getElementById("show-all-div");
  if (phones.length > 12) {
    showAllDiv.classList.remove("hidden");
  } else {
    showAllDiv.classList.add("hidden");
  }

  phones = phones.slice(0, 12);

  phones.forEach((phone) => {
    // console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList = `card shadow-xl`;
    phoneDiv.innerHTML = `
    <figure class="bg-gray-100">
    <img
      class='my-10'
      src="${phone.image}"
      alt="${phone.brand}"
    />
  </figure>
  <div class="card-body text-center">
    <h2 class="text-center text-3xl font-bold">${phone.phone_name}</h2>
    <p>There are many variations of passages of available, but the majority have suffered</p>
    <h2 class="text-2xl my-2 font-bold">$999</h2>
    <div class="card-actions justify-center">
      <button onclick="modalHandler('${phone.slug}')" class="btn btn-primary">Show Details</button>
    </div>
  </div>
    `;
    phoneCard.appendChild(phoneDiv);
  });
  toggleSpinLoader(false);
};

modalHandler = async (id) => {
  // console.log('clicked show details', id)
  // load single phone data
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;

  showPhoneDetails(phone);
};

showPhoneDetails = (phone) => {
  console.log(phone);
  const phoneName = document.getElementById("show-detail-phone-name");

  const showModalDetails = document.getElementById("show_modal_details");
  showModalDetails.innerHTML = `
    <img class="bg-slate-300 mx-auto" src="${phone.image}" alt=""/>
    <h3 class="text-5xl font-bold">${phone.name}</h3>
    <p class="mt-6 mb-5">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <p class="my-4 text-lg"><span class=" font-bold">Storage :</span>${
      phone?.mainFeatures?.storage || "No Storage are installed"
    }</p>
    <p class="my-4 text-lg"><span class=" font-bold">Display Size :</span>${
      phone?.mainFeatures?.displaySize || "No Display size are available"
    }</p>
   <p> <span class=" font-bold">Chipset :</span>${
     phone?.mainFeatures?.chipSet || "No chip set are available"
   }</p>
    <p class="my-4 text-lg"><span class=" font-bold">Memory :</span>${
      phone?.mainFeatures?.displaySize || "No Display size are available"
    }</p>
    <p class="my-4 text-lg"><span class=" font-bold">Slug :</span>${
      phone?.mainFeatures?.memory || "There're no memory feature."
    }</p>
    <p class="my-4 text-lg"><span class=" font-bold">Release data :</span>${
      phone?.releseDate || "Release date not defined."
    }</p>
    <p class="my-4 text-lg"><span class=" font-bold">Brand :</span>${
      phone?.slug || "No Id available."
    }</p>
    <p class="my-4 text-lg"><span class=" font-bold">GPS :</span>${
      phone?.others?.GPS || "No GPS found."
    }</p>
    
  `;

  // show the modal
  show_modal_detail.showModal();
};

searchHandle = () => {
  toggleSpinLoader(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  // console.log(searchText);

  loadPhone(searchText);
};

toggleSpinLoader = (isLoading) => {
  const spinLoader = document.getElementById("toggle-handler");
  if (isLoading) {
    spinLoader.classList.remove("hidden");
  } else {
    spinLoader.classList.add("hidden");
  }
};

loadPhone();
