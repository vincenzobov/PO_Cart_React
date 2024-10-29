import './Header.css'




export default function Header(){
    
  
    return (
        <header>
          <div id="headerRow1" class="header__row1">
            <a href="https://www.persol.com/usa" id="contentLink_1_HeaderStoreLogo_Content">
            <span>
              <img  className="header-logo"src='https://media.persol.com/DropDownMenu/PO_header_persol_logo.svg'></img>
            </span>
            </a>
            <div className='menu-container'>
            <ul class="nav__list nav-menu ct_po-ddm">

                <li class="nav__item nav-item">
                    <a id="departmentLink_sun" class="nav__link desktop" data-element-id="X_X_MainNav_Sun" data-description="Sun" href="https://www.persol.com/usa/sunglasses" aria-label="sunglasses shop all" >
                        <span class="menuLink">SUNGLASSES</span>
                    </a>
                    <span class="nav__link nav__link--phone phone">SUNGLASSES</span>
                </li>
                <li class="nav__item nav-item" data-mobile-order="2">
                    <a id="departmentLink_eyes" class="nav__link desktop" data-element-id="X_X_MainNav_Optical" data-description="Optical" href="https://www.persol.com/usa/optical" aria-label="eyeglasses shop all" >
                        <span class="menuLink">EYEGLASSES</span>
                    </a>
                    <span class="nav__link nav__link--phone phone">EYEGLASSES</span>
                </li>

                <li class="nav__item nav-item" data-mobile-order="3">
                    <a id="departmentLink_Gif" class="nav__link desktop" data-element-id="X_X_MainNav_Prescription" data-description="prescription" href="https://www.persol.com/usa/prescription-glasses" aria-label="PRESCRIPTION" >
                        <span class="menuLink">
                    PRESCRIPTION
                        </span>
                    </a>
                    <span class="nav__link nav__link--phone phone">PRESCRIPTION</span>
                </li>

                <li class="nav__item nav-item" data-mobile-order="4">
                    <a id="departmentLink_OurWorld" class="nav__link desktop" data-element-id="X_X_MainNav_Persol" data-description="Persol" href="https://www.persol.com/usa/heritage" aria-label="IT'S PERSOL" >
                        <span class="menuLink">
                        IT'S PERSOL
                        </span>
                    </a>
                    <a id="departmentLink_OurWorld_mobile" class="nav__link nav__link--phone phone" aria-label="IT'S PERSOL">IT'S PERSOL</a>
                </li>

                <li class="nav__item nav-item" data-mobile-order="5">
                    <a id="departmentLink_blackfriday" class="nav__link desktop ct-nav-gg" data-element-id="X_X_MainNav_BlackFriday" data-description="New Arrivals" href="https://www.persol.com/usa/sunglasses-new-arrivals" aria-label="NEW ARRIVALS" >
                        <span class="menuLink" >
                            NEW ARRIVALS
                        </span>
                    </a>
                    <span class="nav__link nav__link--phone phone"> <span class="ct-nav-gg-mob"> NEW ARRIVALS </span></span>
                </li>

            </ul>
            </div>

          </div>
        </header>
      );
  }