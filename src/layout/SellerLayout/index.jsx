import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { SellerProvider } from '../../hooks/contexts/SellerContext';
import { Socket } from '../../services/socket';
import { useAuth } from '../../hooks/contexts/AuthContext';

function SellerLayout() {
	const { shop_id } = useAuth();
	const [isSidebarVisible, setIsSidebarVisible] = useState(window.innerWidth >= 992); 

	useEffect(() => {
		Socket.emit('join-checkout', shop_id);
	}, [shop_id]); 

	useEffect(() => {
		const handleResize = () => {
			if (window.innerWidth < 992) {
				setIsSidebarVisible(false); 
			} else {
				setIsSidebarVisible(true); 
			}
		};

		window.addEventListener('resize', handleResize);
		handleResize(); 

		return () => window.removeEventListener('resize', handleResize);
	}, []);


	const toggleSidebarVisibility = () => {
		setIsSidebarVisible(!isSidebarVisible);
	};
	
	useEffect(() => {
		const style = document.createElement('style');
		style.innerHTML = `
			#sidebar {
				transition: left 0.3s ease, transform 0.3s ease; /* Thêm transform */
				/* Style cho mobile overlay */
				@media (max-width: 991.98px) { /* Dưới lg */
					position: fixed;
					left: 0;
					/* transform: translateX(-100%); */ /* Ban đầu ẩn hoàn toàn */
					z-index: 1040; /* Cao hơn header */
                    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
                    height: 100vh; /* Đảm bảo chiều cao */
				}
			}
            #sidebar.visible-mobile {
                transform: translateX(0); /* Hiện ra khi có class */
            }

			.content-wrapper {
				transition: margin-left 0.3s ease, width 0.3s ease;
                min-height: 100vh;
                display: flex;
                flex-direction: column;
			}
             /* Style cho desktop */
            @media (min-width: 992px) { /* Từ lg trở lên */
                 .content-wrapper.sidebar-visible {
                    margin-left: 17rem;
			        width: calc(100% - 17rem);
                 }
                 .content-wrapper.sidebar-hidden {
                    margin-left: 0;
			        width: 100%;
                 }
            }
            /* Style cho mobile */
             @media (max-width: 991.98px) {
                 .content-wrapper {
                    margin-left: 0 !important; /* Luôn full width */
			        width: 100% !important;
                 }
             }

			#brand-logo-header {
				transition: opacity 0.3s ease, display 0.3s ease;
			}

            .sidebar-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1035; /* Dưới sidebar, trên content */
                display: none; /* Mặc định ẩn */
                opacity: 0;
                transition: opacity 0.3s ease;
            }
             .sidebar-overlay.show {
                display: block;
                opacity: 1;
            }
		`;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

    const isDesktop = window.innerWidth >= 992;
    const contentWrapperClass = isDesktop
        ? (isSidebarVisible ? 'sidebar-visible' : 'sidebar-hidden')
        : ''; 
    const sidebarClass = !isDesktop && isSidebarVisible ? 'visible-mobile' : '';
    const shouldShowOverlay = !isDesktop && isSidebarVisible;

	return (
		<>
			<SellerProvider>
                <div
                   className={`sidebar-overlay ${shouldShowOverlay ? 'show' : ''}`}
                   onClick={toggleSidebarVisibility} 
                ></div>

				<div className='d-flex'>
					<Sidebar isVisible={isSidebarVisible} sidebarClass={sidebarClass}/>

					<div className={`content-wrapper ${contentWrapperClass}`}>
						<Header toggleSidebar={toggleSidebarVisibility} isSidebarInitiallyVisible={isSidebarVisible} />

						<div style={{
							padding: '12px',
							flex: 1, 
							overflowY: 'auto' 
						}}>
							<Outlet />
						</div>
					</div>
				</div>
			</SellerProvider>
		</>
	);
}

export default SellerLayout;