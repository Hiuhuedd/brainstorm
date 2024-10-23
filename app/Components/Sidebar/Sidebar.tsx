"use client";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useGlobalState } from "@/app/context/globalProvider";
import Image from "next/image";
import menu from "@/app/utils/menu";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Button from "../Button/Button";
import { arrowLeft, bars, logout } from "@/app/utils/Icons";
import { UserButton, useClerk, useUser } from "@clerk/nextjs";

function Sidebar() {
  const { theme, collapsed, collapseMenu } = useGlobalState();
  const { signOut } = useClerk();
  const sidebarRef = useRef(null);

  const { user } = useUser();

  const { firstName, lastName, imageUrl } = user || {
    firstName: "",
    lastName: "",
    imageUrl: "",
  };

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    function handleClickOutside(event: { target: Node | null; }) {
      // Only process if sidebar is open (not collapsed)
      if (sidebarRef.current && 
          !sidebarRef.current.contains(event.target) && 
          !collapsed) {
        // Check if the clicked element is not the toggle button
        const toggleButton = document.querySelector('.toggle-nav');
        if (!toggleButton?.contains(event.target)) {
          collapseMenu();
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [collapsed, collapseMenu]);

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <SidebarStyled theme={theme} collapsed={collapsed} ref={sidebarRef}>
      <button className="toggle-nav" onClick={collapseMenu}>
        {collapsed ? bars : ''}
      </button>
      <div className="profile">
        <div className="profile-overlay"></div>
        <div className="image">
          <Image width={70} height={70} src={imageUrl} alt="profile" />
        </div>
        <div className="user-btn absolute z-20 top-0 w-full h-full">
          <UserButton />
        </div>
        <h1 className="capitalize text-sm">
          {firstName} {lastName}
        </h1>
      </div>
      <ul className="nav-items">
        {menu.map((item) => {
          const link = item.link;
          return (
            <li
              key={item.id}
              className={`nav-item ${pathname === link ? "active" : ""}`}
              onClick={() => {
                handleClick(link);
                collapseMenu()
              }}
            >
              {item.icon}
              <Link href={link}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
      <div className="sign-out relative m-6">
        <Button
          name={"Sign Out"}
          type={"submit"}
          padding={"0.4rem 0.8rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          icon={logout}
          color={theme.colorDanger}
          click={() => {
            signOut(() => router.push("/signin"));
          }}
        />
      </div>
    </SidebarStyled>
  );
}

const SidebarStyled = styled.nav<{ collapsed: boolean }>`
  position: relative;
  width: ${(props) => props.theme.sidebarWidth};
  background-color: black; /* Semi-transparent white */
    backdrop-filter: blur(10px); /* Blur effect */
    box-shadow: 0 4px 15px rgba(1, 0, 0, 0.2); /* Shadow for depth */
    border: 1px solid rgba(255, 255, 255, 0.2); /* Light border */
  border-radius: .2rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  color: ${(props) => props.theme.colorGrey3};

  @media screen and (max-width: 768px) {
    position: fixed;
    height: calc(100vh - 2rem);
    z-index: 100;

    transition: all 0.3s cubic-bezier(0.53, 0.21, 0, 1);
    transform: ${(props) =>
      props.collapsed ? "translateX(-107%)" : "translateX(0)"};

    .toggle-nav {
      display: block !important;
    }
  }

  .toggle-nav {
    display: none;
    padding: 0.8rem 0.9rem;
    position: absolute;
    right: -69px;
    top: .2rem;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;

  }

  .user-btn {
    .cl-rootBox {
      width: 100%;
      height: 100%;

      .cl-userButtonBox {
        width: 100%;
        height: 100%;

        .cl-userButtonTrigger {
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
    }
  }

  .profile {
    margin: .5rem;
    padding: 1rem 0.8rem;
    position: relative;

    border-radius: 1rem;
    cursor: pointer;

    font-weight: 500;
    color: ${(props) => props.theme.colorGrey6};

    display: flex;
    align-items: center;

    .profile-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      backdrop-filter: blur(10px);
      z-index: 0;
      transition: all 0.55s linear;
      border-radius: .3rem;
      border: 1px solid ${(props) => props.theme.colorGreenDark};

      opacity: 0.5;
    }

    h1 {
      font-size: 1.2rem;
      display: flex;
      flex-direction: column;
      
      line-height: 1.4rem;
    }

    .image,
    h1 {
      position: relative;
      z-index: 1;
      font-size:.2rem;
      color: ${(props) => props.theme.colorGreenDark};

    }

    .image {
      flex-shrink: 0;
      display: inline-block;
      overflow: hidden;
      transition: all 0.5s ease;
      border-radius: 100%;

      width: 40px;
      height: 40px;

      img {
        border-radius: 100%;
        transition: all 0.5s ease;
      }
    }

    > h1 {
      margin-left: 0.8rem;
      font-size: 1rem;
      line-height: 100%;
    }

    &:hover {
      .profile-overlay {
        opacity: 1;
        border: 2px solid ${(props) => props.theme.colorGreenLight};
      }

      img {
        transform: scale(1.1);
      }
    }
  }

  .nav-item {
    position: relative;
    padding: 0.8rem 1rem 0.9rem 2.1rem;
    margin: 0.3rem 0;
    color: ${(props) => props.theme.colorGreenDark};

    display: grid;
    grid-template-columns: 40px 1fr;
    cursor: pointer;
    align-items: center;

    &::after {
      position: absolute;
      content: "";
      left: 0;
      top: 0;
      width: 0;
      height: 100%;
      background-color: ${(props) => props.theme.colorBlack};
      z-index: 1;
      transition: all 0.01s ease-in-out;
    }

    &::before {
      position: absolute;
      content: "";
      right: 0;
      top: 0;
      width: 0%;
      height: 100%;
      background-color: ${(props) => props.theme.colorGreenDark};

      border-bottom-left-radius: 5px;
      border-top-left-radius: 5px;
    }
    a {
      font-weight: 500;
      transition: all 0.3s ease-in-out;
      z-index: 2;
      line-height: 0;ty
    }

    i {
      display: flex;
      align-items: center;
      color: ${(props) => props.theme.colorWhite};
    }

    &:hover {
      &::after {
        width: 100%;
      }
    }
  }

 
  .active::before {
    width: 0.3rem;
  }

  > button {
    margin: 1.5rem;
  }:
`;

export default Sidebar;