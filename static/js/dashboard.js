
const getUserData = async () => {
  try {
    const response = await fetch("/getUsername");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

updateUsername();
async function updateUsername() {
  try {
    const userData = await getUserData();
    const username = userData.user.name;
    const userStatus = userData.user.isSubscribed;
    document.querySelector("#username").innerText = username;
  } catch (error) {
    console.error(error);
  }
}

async function screener() {
  try {
    const userData = await getUserData();
    data = userData.user.subscriptionDetails.subscriptionEndDate

    if (
      userData.user.subscriptionDetails.free_trial_over == false ||
      userData.user.subscriptionDetails.paidSubscription == true
    ) {
        window.location.href = "/screener";
    }else{
      subscribePlanDisplay();
      swal("oops !!!", "Your Free trial is over \n Please Subscribe to paid plan", "error")
      

    }
  } catch (error) {
    console.error(error);
  }
}

function logout() {
  // Perform logout operation here, such as calling logout API

  fetch("/logout", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        // Successful logout
        window.location.href = "/"; // Redirect after successful logout
      } else {
        throw new Error("Logout failed");
      }
    })
    .catch((error) => {
      console.error("Logout error:", error);
      // Handle error (e.g., display error message)
    });
}

async function account() {
  let content = document.querySelector(".content");
  htmlContent = `<div class="user-info">
  <h2>User Information</h2>
  <p><strong>Name:</strong> <span id="displayUser"></span></p>
  <p><strong>Email:</strong> <span id="displayEmail"></span></p>
  <p><strong>Subscription Status:</strong> <span id="subscription-status"></span></p>
  <p><strong>Subscription Type:</strong> <span id="subscription-type"></span></p>
  <p><strong>Subscription Start Date:</strong> <span id="subscription-start-date"></span></p>
  <p><strong>Subscription End Date:</strong> <span id="subscription-end-date"></span></p>  
  <p><strong id ="subscription-coupon-used"></strong> <span id="subscription-coupon-details"></span></p>  
</div>`;
  // Select the content element where you want to add the TradingView widget

  content.innerHTML = "";
  content.innerHTML = htmlContent;
  try {
    const userData = await getUserData();
    userName = userData.user.name;
    userEmail = userData.user.email;
    subscriptionStatus = userData.user.subscriptionDetails.subscriptionStatus;
    currentSubscription = userData.user.subscriptionDetails.currentSubscription;
    couponUsed = userData.user.subscriptionDetails.coupon_applied;
  console.log(`couponUsed: ${couponUsed}`);
    subscriptionDate = dateconverter(
      userData.user.subscriptionDetails.subscriptionDate
    );
    subscriptionEndDate = dateconverter(
      userData.user.subscriptionDetails.subscriptionEndDate
    );

    document.querySelector("#displayUser").innerText = userName;
    document.querySelector("#displayEmail").innerText = userEmail;
    document.querySelector("#subscription-status").innerText =
      subscriptionStatus;
    document.querySelector("#subscription-type").innerText =
      currentSubscription;
    document.querySelector("#subscription-start-date").innerText =
      subscriptionDate;
    document.querySelector("#subscription-end-date").innerText =
      subscriptionEndDate;
    if(couponUsed != "no coupon applied"){
      document.querySelector("#subscription-coupon-used").innerText =
      "Coupon Used";
      document.querySelector("#subscription-coupon-details").innerText =couponUsed
    }
    
  } catch (error) {
    console.error(error);
  }
}

function subscribePlanDisplay() {
  let content = document.querySelector(".content");
  htmlContent = `<div class="subscription-box-container">
      <div class="subscription-box">
        <img src="static/images/champions_club.jpg" alt="champions_club">
        <button class ="btn-subscribe" onclick="champions_club()">Join Now</button>
      </div>
      <div class="subscription-box">
          <img src="static/images/achivers_club.jpg" alt="achivers_club">
          <button class ="btn-subscribe" onclick="achivers_club()">Join Now</button>
      </div>
      <div class="subscription-box">
          <img src="static/images/market_club.jpg" alt="market_club">
          <button class ="btn-subscribe" onclick="market_club()">Join Now</button>
      </div>
      
  </div>
  <div class="clearfix"></div>`;
  // Select the content element where you want to add the TradingView widget

  content.innerHTML = "";
  content.innerHTML = htmlContent;
}

function support() {
  let content = document.querySelector(".content");
  htmlContent = `<div class="user-support">
  <h2>Customer Support</h2>
  <p><strong>Contact Us:</strong> <span id="displayUser"> 9876543210</span></p>
  <p><strong>Email:</strong> <span id="subscription-status">info@compoundingfunda.com</span></p>
  
</div>`;
  // Select the content element where you want to add the TradingView widget
  // console.log(htmlContent);
  content.innerHTML = "";
  content.innerHTML = htmlContent;
}

function dateconverter(date) {
  const dateObj = new Date(date);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return dateObj.toLocaleDateString("en-GB", options).replace(/\//g, "-");
}

function champions_club(){
  console.log("champions_club");
  plan = "Champions Club";
    planAmount = 21999;
    showPopup(plan=plan,planAmont = planAmount);
}

function achivers_club(){
  console.log("achivers_club");
    plan = "Achivers Club";
    planAmount = 9999;
    showPopup(plan=plan,planAmont = planAmount);
  }
  




function market_club(){
  console.log("market_club");
    plan = "Market Talk Club";
    planAmount = 2199;
    showPopup(plan=plan,planAmont = planAmount);
}

function showPopup(plan, planAmount ) {
  // Create the popup elements
  const popupOverlay = document.createElement('div');
  popupOverlay.classList.add('popup-overlay');
  
  const popup = document.createElement('div');
  popup.classList.add('popup');
  // console.log(plan, planAmount);

  popup.innerHTML = `
    <h2>Joining Summary </h2>
    <h3 class="popup">${plan}</h3>
    <p class="amount">Amount: ₹${planAmount}</p>
    <label for="coupon" >Coupon:</label>
    <input type="text" id="coupon"  placeholder="apply coupon">
    <button id="apply-btn">Apply</button>
    <p id="coupon-applied" ></p>
    <p id="final-amount" >Total Amount: ₹${planAmount}</p>
    <button id="checkout-btn">Pay Now</button>
    <span class="close">&times;</span>
    
  `;
  
  // Append the popup elements to the document body
  document.body.appendChild(popupOverlay);
  popupOverlay.appendChild(popup);
  
  // Add event listener to close button
  const couponApplied = popup.querySelector('#coupon-applied');
  const closeBtn = popup.querySelector('.close');
  closeBtn.addEventListener('click', function() {
    document.body.removeChild(popupOverlay); // Remove the popup elements when closed
  });
 
  // Update final amount when coupon is entered
  const couponInput = popup.querySelector('#coupon');
  const finalAmountDisplay = popup.querySelector('#final-amount');
  const checkoutBtn = popup.querySelector('#checkout-btn');
  const applybtn = popup.querySelector('#apply-btn');
  let discount = 0;
  let discount_multiplier = 0;
  let discount_flat = 0;
  let couponCode = "";
  let finalAmount = planAmount;
  let serverCoupon;
  let coupon_applied ='no coupon applied';
    couponInput.addEventListener('input', async function() {
    couponCode = couponInput.value.trim();
    
  })
  applybtn.addEventListener('click', async function() {
  if (couponCode === "") {
    couponInput.value = "";
    sweetAlert("OOPS...", "Please Enter coupon code", "warning");
    return;
  }
    couponfetch = await fetchsevercoupon(couponCode);
    console.log(couponfetch);
    const serverState = couponfetch.data.status;
    if(serverState){
      serverCoupon = couponfetch.data.coupon;
      discount_multiplier = couponfetch.data.discount_multiplier;
      discount_flat = couponfetch.data.discount_flat;

      
    }else{
      const data = couponfetch.data.coupon;
      const coupon = couponfetch.data.coupon_state;
      sweetAlert("OOPS...", `${data} \n ${coupon}`, "error");
      couponInput.value = "";
      discount = 0;
      
    }
    if (couponCode === serverCoupon) {
      discount = (planAmount * discount_multiplier) + discount_flat;
      couponApplied.textContent = `Coupon applied: ${serverCoupon}`;
      sweetAlert("Success", "Coupon applied successfully", "success");
      couponApplied.style.color = "green";
      applybtn.textContent = 'Applied';
      applybtn.disabled = true;
      applybtn.style.backgroundColor = 'grey';
      applybtn.style.cursor = 'not-allowed';
      coupon_applied = serverCoupon;
      // console.log(discount);      
    }else if(couponCode == ""){
      sweetAlert("OOPS...", "Please enter coupon code", "warning");
      couponApplied.textContent = ``;
      discount = 0;
    }
    
        
      //  // Update the final amount display
    discount = Math.round(discount);
    finalAmount = planAmount - discount;
 
    finalAmountDisplay.textContent = `Total Amount: ₹${finalAmount}`;
   
  })

  
  
  // Checkout button click event
  checkoutBtn.addEventListener('click', function() {
      console.log(`Checkout button clicked! ${coupon_applied}`);
      razorpayOrderCreation(plan,finalAmount,coupon_applied);
      popup.innerHTML =`
      <div class="processing-indicator" id="processing-indicator">
      <img src="static/images/loading-spinner.gif" alt="Processing...">
      <p>Processing...Please wait</p>`;
      // var popupOverlay = document.querySelector('.popup-overlay');
      // popupOverlay.style.display = 'none';
      
     
  });
}
async function razorpayOrderCreation(plan,amount,coupon_applied) {
  try{
    // console.log(`RAZORPAY ${plan}`);
    // console.log(`RAZORPAY ${amount}`);
    // console.log(`RAZORPAY ${coupon_applied}`);
    const data = {
      plan: plan,
      amount: amount,
      coupon_applied: coupon_applied
    }
    const response = await fetch("/rporder", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const server = await response.json();
    console.log(server.data.id)
    rzscreen(server.data, plan,amount,coupon_applied);
  }catch (error) {
    console.log(error);
  }
}


async function rzscreen(data, plan , Amount, coupon_applied) {
  // Extract the order id from the data object
  var popupOverlay = document.querySelector('.popup-overlay');
  
  const orderId = data.id;
  console.log('RZScreen');
  console.log(data);
  console.log(`order_id: ${orderId}`);
  console.log(`plan: ${plan}`);
  console.log(`amount: ${Amount}`);
  console.log(`coupon_applied: ${coupon_applied}`);
  try {
    const userData = await getUserData();
    userName = userData.user.name;
    userEmail = userData.user.email;
    userMobile = userData.user.mobile;  
  } catch (error) {
    console.error(error);
  }
  // document.getElementById("processing-indicator").style.display = "none";
  // document.body.removeChild(popupOverlay);
  var script = document.createElement('script');
  script.src = 'https://checkout.razorpay.com/v1/checkout.js';
  script.async = true;
  document.head.appendChild(script);
  document.getElementById("processing-indicator").style.display = "none";
  document.body.removeChild(popupOverlay);
  function handlePayment() {
    var options = {
      
      "key": "rzp_test_qWk0YL6y728X61", // Enter your Razorpay Key ID
      // "amount": "50000", // Amount is in currency subunits (50000 paise = ₹500.00)
      "currency": "INR",
      "name": "Compounding Funda",
      "description": `Payment for ${plan} plan`,
      "image": "static/images/logo2.png",
      "order_id": `${orderId}`, // Replace with your actual Order ID
      "handler": function(response) {
        // Handle payment success
     
        console.log(response.razorpay_payment_id);
        console.log(response.razorpay_order_id);
        console.log(response.razorpay_signature);
        paymentConfirmation(response,plan,Amount,coupon_applied);
        
       
      },
      "prefill": {
        "name": `${userName}`,
        "email": `${userEmail}`,
        "contact": `${userMobile}`,
      },
      "notes": {
        "address": "company address"
      },
      "theme": {
        "color": "#3399cc"
      }
    };
    var rzp = new Razorpay(options);
    rzp.on('payment.failed', function(response) {
      sweetAlert("Oops...", "Payment failed!", "error");
      // document.body.removeChild(popupOverlay);
    });
  

    rzp.open();
  
    
  };


  script.onload = handlePayment;
 
}

async function paymentConfirmation(paymentResponse, plan, Amount , coupon_applied) {
  const popupOverlay = document.createElement('div');
  popupOverlay.classList.add('popup-overlay');
  const popup = document.createElement('div');
  popup.classList.add('popup');
  popup.innerHTML =`
      <div class="processing-indicator" id="processing-indicator">
      <img src="static/images/loading-spinner.gif" alt="Processing...">
      <p>Processing...Please wait</p>`;
  document.body.appendChild(popupOverlay);
  popupOverlay.appendChild(popup);
  console.log('Payment Confirmation');
  console.log(paymentResponse.razorpay_order_id);
  const data = {
    payment_id: paymentResponse.razorpay_payment_id,
    orderId: paymentResponse.razorpay_order_id,
    signature: paymentResponse.razorpay_signature,
    plan: plan,
    coupon_applied: coupon_applied,
    Amount: Amount,
  }
  const responseFromServer = await fetch("/paymentconfirmation", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const serverResponse = await responseFromServer.json();
  console.log(serverResponse);
 
  if (responseFromServer.status == 200) {
    document.getElementById("processing-indicator").style.display = "none";
    document.body.removeChild(popupOverlay);
    await updateCouponStatus(coupon_applied);
    sweetAlert("Success!", "Payment successful!", "success");
    
    account();
  } else if (responseFromServer.status == 504) {
    document.getElementById("processing-indicator").style.display = "none";
    document.body.removeChild(popupOverlay);
    sweetAlert("Oops...", `Payment failed! \n ${serverResponse.status} \n Please wait before retry !!! confrim with us`, "error");
  } else {
    document.getElementById("processing-indicator").style.display = "none";
    document.body.removeChild(popupOverlay);
    sweetAlert("Oops...", "Payment failed!", "error");
  }

}

async function fetchsevercoupon(couponCode,plan){
  const data = {
    code: couponCode
  }
  const responseFromServer = await fetch("/checkcoupon", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const serverResponse = await responseFromServer.json();
  console.log(serverResponse);
  console.log(`Data from server ${serverResponse.data}`);
  return serverResponse;
  
}

async function updateCouponStatus(coupion_applied){
  const data = {
    couponused: coupion_applied
  }
  const responseFromServer = await fetch("/updatecoupon", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const serverResponse = await responseFromServer.json();
  console.log(serverResponse);
  return serverResponse;

}