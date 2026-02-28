'use client';

import { useState } from 'react';
import styled from 'styled-components';

// === Figma Assets (24:392 — Visual Identity) ===
const VI_COLOR_ICON =
  'https://www.figma.com/api/mcp/asset/e17fab33-c4b3-466f-b26d-8ecb7c3f44a5';
const VI_ILLUST_ICON =
  'https://www.figma.com/api/mcp/asset/3889c78d-52a4-4f5f-a2c2-394b6e495b3b';
const VI_COMPONENTS_ICON =
  'https://www.figma.com/api/mcp/asset/d6f13734-2cfb-4655-9944-7de9267fa4cf';
const VI_ICONOGRAPHY_ICON =
  'https://www.figma.com/api/mcp/asset/3ecb7be9-158a-402c-9496-4db028ab1715';
const ROOM_PANTRY =
  'https://www.figma.com/api/mcp/asset/ce0b4f9d-c8fc-4ea7-bea9-010f79e7afba';
const ROOM_CRAFTS =
  'https://www.figma.com/api/mcp/asset/7c55263d-83a3-4a13-ad19-bc08c4c558b5';
const ROOM_FISH =
  'https://www.figma.com/api/mcp/asset/0058d155-72c9-4b6b-8cea-ff73abcaf7c4';
const ROOM_BOILER =
  'https://www.figma.com/api/mcp/asset/8a4acbe9-050f-4977-bb3a-8b06f7736687';
const ICON_BTN_IMG =
  'https://www.figma.com/api/mcp/asset/b5fb974f-786a-4a76-a7d2-3e2501e4c779';
const DROPDOWN_SVG =
  'https://www.figma.com/api/mcp/asset/f3769b06-68e6-4d39-a9dc-5a038870f476';
const SEASON_SPRING =
  'https://www.figma.com/api/mcp/asset/e883a7d4-1bb2-4f62-989d-5c942ef4b7f6';
const SEASON_SUMMER =
  'https://www.figma.com/api/mcp/asset/068e33f6-a2a2-4ae7-a5cb-28e1e7c9d51a';
const SEASON_FALL =
  'https://www.figma.com/api/mcp/asset/fd44a1db-88f1-4585-ab89-7f6d69d337e1';
const SEASON_WINTER =
  'https://www.figma.com/api/mcp/asset/e89f2ad9-a51b-4003-a809-9f09e9bed060';
const ICO_ECO =
  'https://www.figma.com/api/mcp/asset/a95e277f-6675-4f22-b35f-93cca3c65936';
const ICO_YARD =
  'https://www.figma.com/api/mcp/asset/28d74fc8-291f-442b-bbbd-6dcf513d0fef';
const ICO_WATER =
  'https://www.figma.com/api/mcp/asset/88673372-fa48-4235-9523-d0045363e87b';
const ICO_SUNNY =
  'https://www.figma.com/api/mcp/asset/295d9ef2-cad9-4571-8c58-2951cc36055e';
const ICO_AGRI =
  'https://www.figma.com/api/mcp/asset/af05ec01-d956-4e9a-8e1c-ca85671136c7';
const ICO_FLORIST =
  'https://www.figma.com/api/mcp/asset/5a28f3d5-2ca7-4565-b9b2-3e3cfabae622';
const ICO_GROUPS =
  'https://www.figma.com/api/mcp/asset/19da3c21-763e-4583-a582-13af0d465b1e';
const ICO_LOVE =
  'https://www.figma.com/api/mcp/asset/2f7fe6ca-3cba-4c8f-8e65-7ddef6518a90';
const ICO_CAKE =
  'https://www.figma.com/api/mcp/asset/d39c7cfd-b635-489b-9468-5b60fef14047';
const ICO_GIFT =
  'https://www.figma.com/api/mcp/asset/cc405e89-8f54-4f23-bb75-f910adc67025';
const ICO_TRADE =
  'https://www.figma.com/api/mcp/asset/2f293ca0-38ff-433b-86fe-dbff804a464e';
const ICO_SET =
  'https://www.figma.com/api/mcp/asset/9d290a74-a9db-425e-b18d-876ff57b6080';
const ICO_FIND =
  'https://www.figma.com/api/mcp/asset/c5419e24-b760-4919-b55d-776bae641c1f';
const ICO_CHECK_SYS =
  'https://www.figma.com/api/mcp/asset/dd4e2272-8e8f-4ee7-b662-2fb4d42cfafc';
const ICO_MENU =
  'https://www.figma.com/api/mcp/asset/dea6d084-5f47-4253-8299-e176235e2761';
const ICO_BACK =
  'https://www.figma.com/api/mcp/asset/ebe4b354-cc99-4ed6-9a67-b17597018abc';
const ICO_CLOSE =
  'https://www.figma.com/api/mcp/asset/33d7d695-1fe5-4f51-b396-441280e2dd1f';

// === Figma Assets (24:747 — Components) ===
const CO_CARDS_NAV =
  'https://www.figma.com/api/mcp/asset/c0309226-f4c8-439a-b6d1-c24a1472e9bf';
const CO_BUTTONS_NAV =
  'https://www.figma.com/api/mcp/asset/f7b3a00d-080f-4ae6-8d8a-602a5173196a';
const CO_PROGRESS_NAV =
  'https://www.figma.com/api/mcp/asset/90639bcf-c513-47c2-91dd-5f89fbbba7d5';
const CO_STATE_NAV =
  'https://www.figma.com/api/mcp/asset/f6048797-ace3-4a0f-b71c-c7e2920f5219';
const CO_CARD_ICON =
  'https://www.figma.com/api/mcp/asset/08acc052-53a7-45b9-9052-6f0ebdfa19f4';
const CO_CARD_DOTS =
  'https://www.figma.com/api/mcp/asset/e25eada9-4ee3-4c33-8362-3b2226f57588';
const CO_INTERACTIVE_ICON =
  'https://www.figma.com/api/mcp/asset/c96a17a0-d019-4ec2-8f8e-07cfb9f319d5';
const CO_CORNER_DECO =
  'https://www.figma.com/api/mcp/asset/c387b03b-fd4c-4784-b9e5-0b906c02248d';
const CO_BTN_ICON =
  'https://www.figma.com/api/mcp/asset/7662d943-9fc8-45fb-adf4-b32503604845';
const CO_LINK_ARROW =
  'https://www.figma.com/api/mcp/asset/3be7cfbd-66b8-46bd-a0f6-f7d976c43f7c';
const CO_HEART_ICON =
  'https://www.figma.com/api/mcp/asset/8175d4d8-70e9-47da-95e0-d28546f45afb';
const CO_PENDING_ICON =
  'https://www.figma.com/api/mcp/asset/a589dfc4-60bc-43d1-b1b8-18e9fef09627';
const CO_INPROGRESS_ICON =
  'https://www.figma.com/api/mcp/asset/d3950b3e-498f-44e8-bc06-2c7973ed6051';
const CO_COMPLETED_CHECK =
  'https://www.figma.com/api/mcp/asset/99132ddc-dda4-418e-be6d-7072c7c1426e';
const CO_COMPLETED_DECO =
  'https://www.figma.com/api/mcp/asset/7ed78279-5294-4bc1-8bf0-3a9df9630095';
const CO_CHECKBOX_CHK =
  'https://www.figma.com/api/mcp/asset/9ed7bf6f-40f9-4770-ae5b-b15f46c5b55c';

// === Styled Components ===

const PageWrapper = styled.div`
  background: #fcfaf8;
  margin: -1.5rem;
  padding: 0;
  min-height: calc(100% + 3rem);
  display: flex;
  flex-direction: column;
`;

const PageHeader = styled.div`
  background: #fcfaf8;
  border-bottom: 1px solid #f3ece7;
  padding: 24px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
`;

const HeaderBrand = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.div`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 25px;
  color: #1b130d;
  letter-spacing: -0.5px;
`;

const HeaderSubtitle = styled.div`
  font-family: var(--font-roboto), sans-serif;
  font-size: 12px;
  font-weight: 500;
  color: #9a6c4c;
  text-transform: uppercase;
  letter-spacing: 1.2px;
`;

const VersionBadge = styled.div`
  background: #f3ece7;
  border-radius: 50px;
  padding: 4px 12px;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #9a6c4c;
`;

const PageBody = styled.div`
  display: flex;
  gap: 48px;
  padding: 48px 40px;
  align-items: flex-start;
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
  flex: 1;
  box-sizing: border-box;
`;

const Sidebar = styled.aside`
  width: 264px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: sticky;
  top: 24px;
`;

const SidebarGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SidebarGroupLabel = styled.div`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 20px;
  color: #9a6c4c;
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;

const SidebarNavList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SidebarNavLink = styled.a<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 24px;
  background: ${({ $active }) =>
    $active ? 'rgba(243, 236, 231, 0.5)' : 'transparent'};
  cursor: pointer;
  text-decoration: none;
  color: ${({ $active }) => ($active ? '#ec6d13' : '#1b130d')};
  font-family: var(--font-roboto), sans-serif;
  font-size: 16px;
  font-weight: ${({ $active }) => ($active ? '500' : '400')};
  line-height: 24px;

  &:hover {
    background: rgba(243, 236, 231, 0.5);
  }

  img {
    width: 14px;
    height: 14px;
    object-fit: contain;
    flex-shrink: 0;
  }
`;

const SidebarDot = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #9a6c4c;
  flex-shrink: 0;
`;

const MainContent = styled.main`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

/* ─── Section ─── */

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const SectionHeader = styled.div`
  border-bottom: 1px solid #f3ece7;
  padding-bottom: 17px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 36px;
  color: #1b130d;
  margin: 0;
`;

const SectionDesc = styled.p`
  font-family: var(--font-roboto), sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #9a6c4c;
  margin: 0;
`;

/* ─── Hero ─── */

const HeroTitle = styled.h1`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 48px;
  font-weight: 800;
  line-height: 48px;
  letter-spacing: -1.2px;
  color: #1b130d;
  margin: 0;
`;

const HeroDesc = styled.p`
  font-family: var(--font-roboto), sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 32px;
  color: #9a6c4c;
  margin: 8px 0 0;
`;

const HeroDivider = styled.div`
  background: #f3ece7;
  height: 1px;
  width: 100%;
`;

/* ─── Section heading with icon ─── */

const SubsectionHeadingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
    flex-shrink: 0;
  }
`;

const SubsectionTitle = styled.h3`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  color: #1b130d;
  margin: 0;
`;

/* ─── Color Palette ─── */

const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  margin-top: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ColorCard = styled.div`
  background: white;
  border: 1px solid #f3ece7;
  border-radius: 32px;
  padding: 25px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ColorCardTitle = styled.h4`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  color: #1b130d;
  margin: 0;
`;

const ColorRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ColorSwatch = styled.div<{ $color: string; $border?: boolean }>`
  width: 64px;
  height: 64px;
  border-radius: 24px;
  background: ${({ $color }) => $color};
  flex-shrink: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  ${({ $border }) => $border && 'border: 1px solid #f3ece7;'}
`;

const ColorInfo = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ColorNameRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ColorName = styled.span`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1b130d;
`;

const ColorHex = styled.span`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #1b130d;
`;

const ColorDesc = styled.p`
  font-family: var(--font-roboto), sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #9a6c4c;
  margin: 0;
`;

/* ─── Illustrative Elements ─── */

const IllustrativeCard = styled.div`
  background: #f3ece7;
  border: 1px solid #f3ece7;
  border-radius: 32px;
  padding: 33px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const IllustrativeLabel = styled.div`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #9a6c4c;
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

const IllustrativeText = styled.p`
  font-family: var(--font-roboto), sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #9a6c4c;
  margin: 0;
`;

const RoomIconRow = styled.div`
  display: flex;
  gap: 16px;
  padding-top: 8px;
`;

const RoomIconCircle = styled.div<{ $bg: string; $border?: string }>`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  border: ${({ $border }) => $border || '1px solid transparent'};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  img {
    max-width: 26px;
    max-height: 26px;
    object-fit: contain;
  }
`;

const SeasonalGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  padding-top: 8px;
`;

const SeasonBadge = styled.div<{ $bg: string; $border: string }>`
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $border }) => $border};
  border-radius: 24px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  overflow: hidden;

  img {
    width: 16px;
    height: 16px;
    object-fit: contain;
  }
`;

const SeasonName = styled.span<{ $color: string }>`
  font-family: var(--font-roboto), sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: ${({ $color }) => $color};
`;

/* ─── Components & Interactions ─── */

const WhiteCard = styled.div`
  background: white;
  border: 1px solid #f3ece7;
  border-radius: 32px;
  padding: 33px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Subheading = styled.h4`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 18px;
  font-weight: 700;
  line-height: 28px;
  color: #1b130d;
  margin: 0;
`;

const SubText = styled.p`
  font-family: var(--font-roboto), sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: #9a6c4c;
  margin: 0;
  padding-bottom: 16px;
`;

const MonoLabel = styled.span`
  font-family: 'Courier New', monospace;
  font-size: 10px;
  color: #9a6c4c;
`;

const DemoBox = styled.div`
  background: #fcfaf8;
  border: 1px solid #f3ece7;
  border-radius: 24px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

const BtnGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const PrimaryBtn = styled.button`
  background: #ec6d13;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 10px 24px;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 11px;
    height: 11px;
    object-fit: contain;
  }
`;

const SecondaryBtn = styled.button`
  background: white;
  color: #1b130d;
  border: 2px solid #f3ece7;
  border-radius: 16px;
  padding: 12px 25px;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const IconBtnStyled = styled.button`
  background: rgba(141, 163, 153, 0.2);
  border: none;
  border-radius: 32px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #6b7c74;

  img {
    width: 11px;
    height: 11px;
    object-fit: contain;
  }
`;

const FarmSelectorBox = styled.div`
  background: #fcfaf8;
  border: 1px solid #f3ece7;
  border-radius: 24px;
  padding: 25px;
  max-width: 384px;
  margin-top: 8px;
`;

const FarmSelectorLabel = styled.div`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #9a6c4c;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin-bottom: 8px;
`;

const FarmSelectorDropdown = styled.div`
  background: white;
  border: 1px solid #f3ece7;
  border-radius: 24px;
  height: 46px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  img {
    width: 21px;
    height: 21px;
    object-fit: contain;
  }
`;

const FarmSelectorText = styled.span`
  font-family: var(--font-roboto), sans-serif;
  font-size: 14px;
  font-weight: 500;
  color: #1b130d;
`;

const SpacingLabel = styled.div`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #9a6c4c;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

const PaddingScaleRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const PaddingBlock = styled.div<{ $w: number }>`
  background: #8da399;
  height: 32px;
  width: ${({ $w }) => $w}px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: white;
  flex-shrink: 0;
`;

const GridPreview = styled.div`
  background: rgba(243, 236, 231, 0.5);
  border-radius: 16px;
  padding: 4px;
  display: flex;
  gap: 4px;
  height: 80px;
  margin-top: 8px;
`;

const GridCol = styled.div`
  background: rgba(236, 109, 19, 0.2);
  flex: 1;
  border-radius: 16px;
`;

/* ─── Iconography ─── */

const IconographyCard = styled.div`
  background: white;
  border: 1px solid #f3ece7;
  border-radius: 32px;
  overflow: hidden;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  display: flex;
`;

const IconographyCol = styled.div`
  flex: 1;
  padding: 32px;
  border-right: 1px solid #f3ece7;
  display: flex;
  flex-direction: column;
  gap: 24px;

  &:last-child {
    border-right: none;
  }
`;

const IconCategoryLabel = styled.div`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #9a6c4c;
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;

const IconGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 8px;
`;

const IconItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
`;

const IconItemLabel = styled.span`
  font-family: var(--font-roboto), sans-serif;
  font-size: 10px;
  color: #9a6c4c;
  text-align: center;
`;

/* ─── Typography ─── */

const TypeScaleBox = styled.div`
  background: rgba(243, 236, 231, 0.3);
  border: 1px solid #f3ece7;
  border-radius: 16px;
  padding: 33px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const TypeRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`;

const TypeLabelCell = styled.div`
  width: 120px;
  flex-shrink: 0;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  color: #9a6c4c;
`;

/* ─── Cards & Containers ─── */

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StandardCard = styled.div`
  background: white;
  border: 1px solid #f3ece7;
  border-radius: 32px;
  padding: 25px;
  box-shadow: 0 4px 20px -2px rgba(27, 19, 13, 0.08);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const CardHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardIconTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const InteractiveCard = styled.div`
  background: #f3ece7;
  border-radius: 32px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: relative;
  overflow: hidden;
`;

const InteractiveCorner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 25px;
  height: 25px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const FeaturedCard = styled.div`
  background: #ec6d13;
  border-radius: 32px;
  padding: 24px;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
`;

const FeaturedCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  max-width: 60%;
  position: relative;
  z-index: 1;
`;

const FeaturedCardTitle = styled.div`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  color: white;
`;

const FeaturedCardDesc = styled.div`
  font-family: var(--font-roboto), sans-serif;
  font-size: 14px;
  line-height: 20px;
  color: rgba(255, 255, 255, 0.8);
`;

const FeaturedCardBtn = styled.button`
  background: white;
  color: #ec6d13;
  border: none;
  border-radius: 24px;
  padding: 8px 16px;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  flex-shrink: 0;
  position: relative;
  z-index: 1;
`;

const FeaturedCardBg = styled.div`
  position: absolute;
  top: -35px;
  right: -36px;
  width: 144px;
  height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(12deg);
  font-family: 'Material Symbols Outlined', sans-serif;
  font-size: 120px;
  color: rgba(255, 255, 255, 0.1);
  pointer-events: none;
`;

/* ─── Buttons & Actions ─── */

const ButtonsDemoBox = styled.div`
  background: rgba(243, 236, 231, 0.3);
  border: 1px solid #f3ece7;
  border-radius: 16px;
  padding: 33px;
  display: flex;
  align-items: center;
  gap: 32px;
  flex-wrap: wrap;
`;

const BtnDemoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const PrimaryBtnLg = styled.button`
  background: #ec6d13;
  color: white;
  border: none;
  border-radius: 50px;
  padding: 12px 24px;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -2px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;

  img {
    width: 12px;
    height: 12px;
    object-fit: contain;
  }
`;

const SecondaryBtnLg = styled.button`
  background: #f3ece7;
  color: #1b130d;
  border: 1px solid #f3ece7;
  border-radius: 50px;
  padding: 13px 25px;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
`;

const TextLinkBtn = styled.button`
  background: none;
  border: none;
  color: #ec6d13;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0;

  img {
    width: 11px;
    height: 11px;
    object-fit: contain;
  }
`;

const IconOnlyBtn = styled.button`
  background: white;
  border: 1px solid #f3ece7;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  img {
    width: 20px;
    height: 19px;
    object-fit: contain;
  }
`;

const SegmentedControl = styled.div`
  background: #f3ece7;
  border: 1px solid #f3ece7;
  border-radius: 24px;
  padding: 5px;
  display: flex;
  gap: 2px;
`;

const SegmentBtn = styled.button<{ $active?: boolean }>`
  background: ${({ $active }) => ($active ? 'white' : 'transparent')};
  border: none;
  border-radius: 6px;
  padding: 6px 16px;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: ${({ $active }) => ($active ? '700' : '500')};
  color: ${({ $active }) => ($active ? '#ec6d13' : '#9a6c4c')};
  cursor: pointer;
  box-shadow: ${({ $active }) =>
    $active ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none'};
`;

/* ─── State Management ─── */

const StateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const StateCard = styled.div<{
  $bg: string;
  $border: string;
  $dashed?: boolean;
}>`
  background: ${({ $bg }) => $bg};
  border: ${({ $dashed }) => ($dashed ? '2px dashed' : '1px solid')}
    ${({ $border }) => $border};
  border-radius: 32px;
  padding: ${({ $dashed }) => ($dashed ? '26px' : '25px')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  position: relative;
  overflow: hidden;
`;

const StateIconCircle = styled.div<{ $bg: string; $shadow?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $bg }) => $bg};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${({ $shadow }) =>
    $shadow ? '0 1px 2px 0 rgba(0,0,0,0.05)' : 'none'};

  img {
    max-width: 20px;
    max-height: 20px;
    object-fit: contain;
  }
`;

const StateLabel = styled.div<{ $color: string }>`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  color: ${({ $color }) => $color};
  text-align: center;
`;

const StateBadge = styled.div<{ $bg: string; $color: string }>`
  background: ${({ $bg }) => $bg};
  border-radius: 50px;
  padding: 4px 12px;
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  text-transform: uppercase;
  letter-spacing: 0.6px;
`;

const StateProgressBar = styled.div`
  background: rgba(236, 109, 19, 0.1);
  height: 8px;
  border-radius: 50px;
  width: 100%;
  overflow: hidden;
  position: relative;
`;

const StateProgressFill = styled.div<{ $w: string }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ $w }) => $w};
  background: #ec6d13;
  border-radius: 50px;
`;

const InputStatesCard = styled.div`
  background: white;
  border: 1px solid #f3ece7;
  border-radius: 32px;
  padding: 25px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputStateLabel = styled.div`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #9a6c4c;
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;

const CheckboxRow = styled.div<{ $faded?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  opacity: ${({ $faded }) => ($faded ? 0.5 : 1)};
`;

const CheckboxUnchecked = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  border: 2px solid #f3ece7;
  background: white;
  flex-shrink: 0;
`;

const CheckboxChecked = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  background: #ec6d13;
  border: 1px solid #ec6d13;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

  img {
    width: 11px;
    height: 8px;
    object-fit: contain;
  }
`;

const CheckboxDisabled = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 16px;
  background: #f3ece7;
  border: 2px solid #f3ece7;
  flex-shrink: 0;
`;

const CheckboxLabel = styled.span<{ $strike?: boolean }>`
  font-family: var(--font-roboto), sans-serif;
  font-size: 14px;
  color: ${({ $strike }) => ($strike ? '#9a6c4c' : '#1b130d')};
  text-decoration: ${({ $strike }) => ($strike ? 'line-through' : 'none')};
`;

const CompletedDeco = styled.div`
  position: absolute;
  top: -16px;
  right: -16px;
  width: 73px;
  height: 70px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

/* ─── Progress Indicators ─── */

const ProgressTwoCol = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  align-items: start;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const ProgressCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ProgressHeadLabel = styled.div`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 14px;
  font-weight: 700;
  color: #9a6c4c;
  text-transform: uppercase;
  letter-spacing: 0.7px;
`;

const ProgressLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const ProgressBarLabel = styled.span`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: #1b130d;
`;

const ProgressBarPct = styled.span<{ $color: string }>`
  font-family: var(--font-publicSans), sans-serif;
  font-size: 12px;
  font-weight: 700;
  color: ${({ $color }) => $color};
`;

const ProgressBarOuter = styled.div`
  background: #f3ece7;
  height: 24px;
  border-radius: 50px;
  padding: 4px;
  overflow: hidden;
  box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
`;

const ProgressBarFill = styled.div<{ $w: string; $color: string }>`
  background: ${({ $color }) => $color};
  width: ${({ $w }) => $w};
  height: 100%;
  border-radius: 50px;
  background-image: linear-gradient(
    3deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%
  );
`;

const ThinProgressBar = styled.div`
  background: #f3ece7;
  height: 8px;
  border-radius: 50px;
  overflow: hidden;
  position: relative;
`;

const ThinProgressFill = styled.div<{ $w: string; $color: string }>`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: ${({ $w }) => $w};
  background: ${({ $color }) => $color};
  border-radius: 50px;
`;

const CircleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

const CircleProgress = styled.div<{
  $size: number;
  $pct: number;
  $color: string;
}>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: conic-gradient(
    ${({ $color }) => $color} ${({ $pct }) => $pct * 3.6}deg,
    #f3ece7 ${({ $pct }) => $pct * 3.6}deg
  );
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const CircleInner = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircleLabel = styled.span<{ $size: 'lg' | 'sm' }>`
  font-family: var(--font-publicSans), sans-serif;
  font-size: ${({ $size }) => ($size === 'lg' ? '20px' : '12px')};
  font-weight: 700;
  color: ${({ $size }) => ($size === 'lg' ? '#ec6d13' : '#8da399')};
`;

/* ─── Footer ─── */

const PageFooter = styled.footer`
  border-top: 1px solid #f3ece7;
  padding: 33px 40px 32px;
  text-align: center;
  background: white;

  p {
    font-family: var(--font-roboto), sans-serif;
    font-size: 14px;
    line-height: 20px;
    color: #9a6c4c;
    margin: 0;
  }
`;

// === Page Component ===

type NavItem =
  | 'visual-identity'
  | 'typography'
  | 'color-system'
  | 'cards'
  | 'buttons'
  | 'progress'
  | 'state';

export default function DesignSystem2Page() {
  const [activeNav, setActiveNav] = useState<NavItem>('visual-identity');

  return (
    <PageWrapper>
      {/* Header */}
      <PageHeader>
        <HeaderBrand>
          <HeaderTitle>Stardew Tracker</HeaderTitle>
          <HeaderSubtitle>Design System v2</HeaderSubtitle>
        </HeaderBrand>
        <VersionBadge>v2.0.0</VersionBadge>
      </PageHeader>

      <PageBody>
        {/* Sidebar */}
        <Sidebar>
          <SidebarGroup>
            <SidebarGroupLabel>Foundation</SidebarGroupLabel>
            <SidebarNavList>
              <SidebarNavLink
                href="#visual-identity"
                $active={activeNav === 'visual-identity'}
                onClick={() => setActiveNav('visual-identity')}
              >
                <SidebarDot />
                Visual Identity
              </SidebarNavLink>
              <SidebarNavLink
                href="#typography"
                $active={activeNav === 'typography'}
                onClick={() => setActiveNav('typography')}
              >
                <SidebarDot />
                Typography
              </SidebarNavLink>
              <SidebarNavLink
                href="#color-system"
                $active={activeNav === 'color-system'}
                onClick={() => setActiveNav('color-system')}
              >
                <SidebarDot />
                Color System
              </SidebarNavLink>
            </SidebarNavList>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>Components</SidebarGroupLabel>
            <SidebarNavList>
              <SidebarNavLink
                href="#cards"
                $active={activeNav === 'cards'}
                onClick={() => setActiveNav('cards')}
              >
                <img src={CO_CARDS_NAV} alt="" />
                Cards &amp; Containers
              </SidebarNavLink>
              <SidebarNavLink
                href="#buttons"
                $active={activeNav === 'buttons'}
                onClick={() => setActiveNav('buttons')}
              >
                <img src={CO_BUTTONS_NAV} alt="" />
                Buttons &amp; Actions
              </SidebarNavLink>
              <SidebarNavLink
                href="#progress"
                $active={activeNav === 'progress'}
                onClick={() => setActiveNav('progress')}
              >
                <img src={CO_PROGRESS_NAV} alt="" />
                Progress Indicators
              </SidebarNavLink>
              <SidebarNavLink
                href="#state"
                $active={activeNav === 'state'}
                onClick={() => setActiveNav('state')}
              >
                <img src={CO_STATE_NAV} alt="" />
                State Management
              </SidebarNavLink>
            </SidebarNavList>
          </SidebarGroup>
        </Sidebar>

        {/* Main Content */}
        <MainContent>
          {/* ── Visual Identity ── */}
          <SectionContainer id="visual-identity">
            <div>
              <HeroTitle>Cozy Aesthetic &amp; Visual Identity</HeroTitle>
              <HeroDesc>
                Our visual language is rooted in warmth, organic shapes, and
                earthy tones. It evokes the feeling of a quiet afternoon on the
                farm, focusing on comfort and clarity.
              </HeroDesc>
            </div>

            <HeroDivider />

            {/* Color Palette */}
            <div>
              <SubsectionHeadingRow style={{ marginBottom: 24 }}>
                <img src={VI_COLOR_ICON} alt="" />
                <SubsectionTitle>Expanded Color Palette</SubsectionTitle>
              </SubsectionHeadingRow>
              <ColorCard>
                <ColorCardTitle>Main Colors</ColorCardTitle>
                <ColorRow>
                  <ColorSwatch $color="#FCFAF8" />
                  <ColorInfo>
                    <ColorNameRow>
                      <ColorName>Background</ColorName>
                      <ColorHex>#FCFAF8</ColorHex>
                    </ColorNameRow>
                    <ColorDesc>Background cream color.</ColorDesc>
                  </ColorInfo>
                </ColorRow>
                <ColorRow>
                  <ColorSwatch $color="#FFFFFF" />
                  <ColorInfo>
                    <ColorNameRow>
                      <ColorName>White</ColorName>
                      <ColorHex>#FFFFFF</ColorHex>
                    </ColorNameRow>
                    <ColorDesc>Card background - light.</ColorDesc>
                  </ColorInfo>
                </ColorRow>
                <ColorRow>
                  <ColorSwatch $color="#F3ECE7" $border />
                  <ColorInfo>
                    <ColorNameRow>
                      <ColorName>Cream Dark</ColorName>
                      <ColorHex>#F3ECE7</ColorHex>
                    </ColorNameRow>
                    <ColorDesc>Card background - Dark.</ColorDesc>
                  </ColorInfo>
                </ColorRow>
                <ColorRow>
                  <ColorSwatch $color="#9a6c4c" $border />
                  <ColorInfo>
                    <ColorNameRow>
                      <ColorName>Dark Text</ColorName>
                      <ColorHex>#9a6c4c</ColorHex>
                    </ColorNameRow>
                    <ColorDesc>Text against main colors.</ColorDesc>
                  </ColorInfo>
                </ColorRow>
              </ColorCard>
              <TwoColGrid>
                <ColorCard>
                  <ColorCardTitle>Primary Color (Sage)</ColorCardTitle>
                  <ColorRow>
                    <ColorSwatch $color="#8da399" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Sage Green</ColorName>
                        <ColorHex>#8DA399</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>
                        Success states, nature elements, secondary buttons.
                      </ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#6b7c74" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Deep Sage</ColorName>
                        <ColorHex>#6B7C74</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Icons, text on light backgrounds.</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#e8efec" $border />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Mist</ColorName>
                        <ColorHex>#E8EFEC</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>
                        Neutral backgrounds, disabled states.
                      </ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                </ColorCard>
                <ColorCard>
                  <ColorCardTitle>Secondary Tones</ColorCardTitle>
                  <ColorRow>
                    <ColorSwatch $color="#ec6d13" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Pumpkin Orange</ColorName>
                        <ColorHex>#EC6D13</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Main action color, brand identity.</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#d55f0b" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Rust</ColorName>
                        <ColorHex>#D55F0B</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Hover states, active elements.</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#fcede2" $border />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Cream Orange</ColorName>
                        <ColorHex>#FCEDE2</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>
                        Background highlights, subtle accents.
                      </ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                </ColorCard>
              </TwoColGrid>
              <TwoColGrid>
                <ColorCard>
                  <ColorCardTitle>Spring Tones</ColorCardTitle>
                  <ColorRow>
                    <ColorSwatch $color="#f0fdf4" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Light Green</ColorName>
                        <ColorHex>#f0fdf4</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Background</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#dcfce7" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Primary Green Spring</ColorName>
                        <ColorHex>#dcfce7</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Border</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#15803d" $border />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Dark Green</ColorName>
                        <ColorHex>#15803d</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Text</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                </ColorCard>

                <ColorCard>
                  <ColorCardTitle>Summer Tones</ColorCardTitle>
                  <ColorRow>
                    <ColorSwatch $color="#fefce8" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Light Yellow</ColorName>
                        <ColorHex>#fefce8</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Background</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#fef9c3" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Primary Yellow Summer</ColorName>
                        <ColorHex>#fef9c3</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Border</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#a16207" $border />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Dark Yellow</ColorName>
                        <ColorHex>#a16207</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Text</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                </ColorCard>
              </TwoColGrid>
              <TwoColGrid>
                <ColorCard>
                  <ColorCardTitle>Fall Tones</ColorCardTitle>
                  <ColorRow>
                    <ColorSwatch $color="#fef2f2" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Light Red</ColorName>
                        <ColorHex>#fef2f2</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Background</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#fee2e2" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Primary Red Fall</ColorName>
                        <ColorHex>#fee2e2</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Border</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#b91c1c" $border />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Dark Red</ColorName>
                        <ColorHex>#b91c1c</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Text</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                </ColorCard>

                <ColorCard>
                  <ColorCardTitle>Winter Tones</ColorCardTitle>
                  <ColorRow>
                    <ColorSwatch $color="#ecfeff" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Light Blue</ColorName>
                        <ColorHex>#ecfeff</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Background</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#cffafe" />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Primary Blue Winter</ColorName>
                        <ColorHex>#cffafe</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Border</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                  <ColorRow>
                    <ColorSwatch $color="#0e7490" $border />
                    <ColorInfo>
                      <ColorNameRow>
                        <ColorName>Dark Blue</ColorName>
                        <ColorHex>#0e7490</ColorHex>
                      </ColorNameRow>
                      <ColorDesc>Text</ColorDesc>
                    </ColorInfo>
                  </ColorRow>
                </ColorCard>
              </TwoColGrid>
            </div>

            {/* Illustrative Elements */}
            <div>
              <SubsectionHeadingRow style={{ marginBottom: 24 }}>
                <img src={VI_ILLUST_ICON} alt="" />
                <SubsectionTitle>Illustrative Elements</SubsectionTitle>
              </SubsectionHeadingRow>
              <TwoColGrid>
                <IllustrativeCard>
                  <IllustrativeLabel>Room Icons</IllustrativeLabel>
                  <IllustrativeText>
                    Rounded containers with soft drop shadows. Icons are
                    outlined material symbols.
                  </IllustrativeText>
                  <RoomIconRow>
                    <RoomIconCircle
                      $bg="rgba(255,255,255,0.5)"
                      $border="1px solid white"
                    >
                      <img src={ROOM_PANTRY} alt="Pantry" />
                    </RoomIconCircle>
                    <RoomIconCircle
                      $bg="rgba(141,163,153,0.2)"
                      $border="1px solid rgba(141,163,153,0.1)"
                    >
                      <img src={ROOM_CRAFTS} alt="Crafts Room" />
                    </RoomIconCircle>
                    <RoomIconCircle $bg="#dbeafe">
                      <img src={ROOM_FISH} alt="Fish Tank" />
                    </RoomIconCircle>
                    <RoomIconCircle $bg="#ffedd5">
                      <img src={ROOM_BOILER} alt="Boiler Room" />
                    </RoomIconCircle>
                  </RoomIconRow>
                </IllustrativeCard>

                <IllustrativeCard>
                  <IllustrativeLabel>Seasonal Motifs</IllustrativeLabel>
                  <IllustrativeText>
                    Used as background patterns or card headers to denote
                    seasonality.
                  </IllustrativeText>
                  <SeasonalGrid>
                    <SeasonBadge $bg="#f0fdf4" $border="#dcfce7">
                      <img src={SEASON_SPRING} alt="" />
                      <SeasonName $color="#15803d">Spring</SeasonName>
                    </SeasonBadge>
                    <SeasonBadge $bg="#fefce8" $border="#fef9c3">
                      <img src={SEASON_SUMMER} alt="" />
                      <SeasonName $color="#a16207">Summer</SeasonName>
                    </SeasonBadge>
                    <SeasonBadge $bg="#fef2f2" $border="#fee2e2">
                      <img src={SEASON_FALL} alt="" />
                      <SeasonName $color="#b91c1c">Fall</SeasonName>
                    </SeasonBadge>
                    <SeasonBadge $bg="#ecfeff" $border="#cffafe">
                      <img src={SEASON_WINTER} alt="" />
                      <SeasonName $color="#0e7490">Winter</SeasonName>
                    </SeasonBadge>
                  </SeasonalGrid>
                </IllustrativeCard>
              </TwoColGrid>
            </div>

            {/* Components & Interactions */}
            <div>
              <SubsectionHeadingRow style={{ marginBottom: 24 }}>
                <img src={VI_COMPONENTS_ICON} alt="" />
                <SubsectionTitle>Components &amp; Interactions</SubsectionTitle>
              </SubsectionHeadingRow>
              <div style={{ display: 'flex', gap: 32 }}>
                <WhiteCard style={{ flex: 2 }}>
                  <Subheading>Button Styles</Subheading>
                  <SubText>
                    Soft rounded corners (1rem) to maintain friendly aesthetic.
                    14px text, font-bold.
                  </SubText>
                  <DemoBox>
                    <BtnGroup>
                      <PrimaryBtn>Primary Action</PrimaryBtn>
                      <MonoLabel>px-6 py-2.5 rounded-2xl</MonoLabel>
                    </BtnGroup>
                    <BtnGroup>
                      <SecondaryBtn>Secondary</SecondaryBtn>
                      <MonoLabel>border-2 bg-white</MonoLabel>
                    </BtnGroup>
                    <BtnGroup>
                      <IconBtnStyled>
                        <img src={ICON_BTN_IMG} alt="" />
                        Icon Button
                      </IconBtnStyled>
                      <MonoLabel>gap-2 bg-sage/20</MonoLabel>
                    </BtnGroup>
                  </DemoBox>

                  <Subheading style={{ marginTop: 24 }}>
                    Farm Selector
                  </Subheading>
                  <SubText>
                    A custom dropdown component for context switching.
                  </SubText>
                  <FarmSelectorBox>
                    <FarmSelectorLabel>Label Style</FarmSelectorLabel>
                    <FarmSelectorDropdown>
                      <FarmSelectorText>Riverland Farm</FarmSelectorText>
                      <img src={DROPDOWN_SVG} alt="" />
                    </FarmSelectorDropdown>
                    <MonoLabel style={{ display: 'block', marginTop: 8 }}>
                      Height: 48px, Radius: 0.5rem
                    </MonoLabel>
                  </FarmSelectorBox>
                </WhiteCard>

                <WhiteCard style={{ flex: 1 }}>
                  <Subheading>Spacing &amp; Grid</Subheading>
                  <SubText>
                    Base unit is 4px (0.25rem). Layouts use a flexible 12-column
                    grid.
                  </SubText>

                  <SpacingLabel>Padding Scale</SpacingLabel>
                  <PaddingScaleRow>
                    <PaddingBlock $w={16}>4</PaddingBlock>
                    <PaddingBlock $w={32}>8</PaddingBlock>
                    <PaddingBlock $w={48}>12</PaddingBlock>
                    <PaddingBlock $w={64}>16</PaddingBlock>
                  </PaddingScaleRow>

                  <SpacingLabel style={{ marginTop: 16 }}>
                    12-Col Preview
                  </SpacingLabel>
                  <GridPreview>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <GridCol key={i} />
                    ))}
                  </GridPreview>
                </WhiteCard>
              </div>
            </div>

            {/* Iconography */}
            <div>
              <SubsectionHeadingRow style={{ marginBottom: 24 }}>
                <img src={VI_ICONOGRAPHY_ICON} alt="" />
                <SubsectionTitle>Iconography System</SubsectionTitle>
              </SubsectionHeadingRow>
              <IconographyCard>
                <IconographyCol>
                  <IconCategoryLabel>Farming &amp; Nature</IconCategoryLabel>
                  <IconGrid>
                    <IconItem>
                      <img src={ICO_ECO} alt="eco" />
                      <IconItemLabel>eco</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_YARD} alt="yard" />
                      <IconItemLabel>yard</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_WATER} alt="water" />
                      <IconItemLabel>water</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_SUNNY} alt="sunny" />
                      <IconItemLabel>sunny</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_AGRI} alt="agri" />
                      <IconItemLabel>agri</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_FLORIST} alt="florist" />
                      <IconItemLabel>florist</IconItemLabel>
                    </IconItem>
                  </IconGrid>
                </IconographyCol>
                <IconographyCol>
                  <IconCategoryLabel>Social &amp; Community</IconCategoryLabel>
                  <IconGrid>
                    <IconItem>
                      <img src={ICO_GROUPS} alt="groups" />
                      <IconItemLabel>groups</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_LOVE} alt="love" />
                      <IconItemLabel>love</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_CAKE} alt="cake" />
                      <IconItemLabel>cake</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_GIFT} alt="gift" />
                      <IconItemLabel>gift</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_TRADE} alt="trade" />
                      <IconItemLabel>trade</IconItemLabel>
                    </IconItem>
                  </IconGrid>
                </IconographyCol>
                <IconographyCol>
                  <IconCategoryLabel>System &amp; UI</IconCategoryLabel>
                  <IconGrid>
                    <IconItem>
                      <img src={ICO_SET} alt="set" />
                      <IconItemLabel>set</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_FIND} alt="find" />
                      <IconItemLabel>find</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_CHECK_SYS} alt="check" />
                      <IconItemLabel>check</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_MENU} alt="menu" />
                      <IconItemLabel>menu</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_BACK} alt="back" />
                      <IconItemLabel>back</IconItemLabel>
                    </IconItem>
                    <IconItem>
                      <img src={ICO_CLOSE} alt="close" />
                      <IconItemLabel>close</IconItemLabel>
                    </IconItem>
                  </IconGrid>
                </IconographyCol>
              </IconographyCard>
            </div>
          </SectionContainer>

          {/* ── Typography ── */}
          <SectionContainer id="typography">
            <SectionHeader>
              <SectionTitle>Typography</SectionTitle>
              <SectionDesc>
                Hierarchical type scale using Public Sans for a clean, legible,
                and slightly rustic feel.
              </SectionDesc>
            </SectionHeader>

            <TypeScaleBox>
              <TypeRow>
                <TypeLabelCell>Display H1</TypeLabelCell>
                <h1
                  style={{
                    fontFamily: 'var(--font-publicSans), sans-serif',
                    fontSize: 48,
                    fontWeight: 800,
                    lineHeight: '48px',
                    letterSpacing: '-1.2px',
                    color: '#1b130d',
                    margin: 0,
                  }}
                >
                  Farm Life
                </h1>
              </TypeRow>
              <TypeRow>
                <TypeLabelCell>Heading H2</TypeLabelCell>
                <h2
                  style={{
                    fontFamily: 'var(--font-publicSans), sans-serif',
                    fontSize: 30,
                    fontWeight: 700,
                    lineHeight: '36px',
                    color: '#1b130d',
                    margin: 0,
                  }}
                >
                  Community Center
                </h2>
              </TypeRow>
              <TypeRow>
                <TypeLabelCell>Heading H3</TypeLabelCell>
                <h3
                  style={{
                    fontFamily: 'var(--font-publicSans), sans-serif',
                    fontSize: 20,
                    fontWeight: 700,
                    lineHeight: '28px',
                    color: '#1b130d',
                    margin: 0,
                  }}
                >
                  Pantry Bundles
                </h3>
              </TypeRow>
              <TypeRow>
                <TypeLabelCell>Body Regular</TypeLabelCell>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto), sans-serif',
                    fontSize: 16,
                    fontWeight: 400,
                    lineHeight: '26px',
                    color: '#1b130d',
                    margin: 0,
                  }}
                >
                  The quick brown fox jumps over the lazy dog. Cozy farming
                  interfaces prioritize readability and warmth.
                </p>
              </TypeRow>
              <TypeRow>
                <TypeLabelCell>Caption / Label</TypeLabelCell>
                <span
                  style={{
                    fontFamily: 'var(--font-publicSans), sans-serif',
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#9a6c4c',
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                  }}
                >
                  Reward: 20 Speed-Gro
                </span>
              </TypeRow>
            </TypeScaleBox>
          </SectionContainer>

          {/* ── Cards & Containers ── */}
          <SectionContainer id="cards">
            <SectionHeader>
              <SectionTitle>Cards &amp; Containers</SectionTitle>
              <SectionDesc>
                Tactile surfaces with soft shadows and organic borders to mimic
                paper or wood textures.
              </SectionDesc>
            </SectionHeader>

            <CardsGrid>
              <StandardCard>
                <CardHeaderRow>
                  <CardIconTitle>
                    <img
                      src={CO_CARD_ICON}
                      alt=""
                      style={{ width: 36, height: 36 }}
                    />
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-publicSans), sans-serif',
                          fontSize: 18,
                          fontWeight: 700,
                          color: '#1b130d',
                        }}
                      >
                        Standard Card
                      </div>
                    </div>
                  </CardIconTitle>
                  <img
                    src={CO_CARD_DOTS}
                    alt=""
                    style={{ width: 16, height: 4 }}
                  />
                </CardHeaderRow>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto), sans-serif',
                    fontSize: 14,
                    lineHeight: '20px',
                    color: '#9a6c4c',
                    margin: 0,
                  }}
                >
                  Base container style for lists, tasks, and inventory items.
                  Uses a subtle &apos;soft&apos; shadow.
                </p>
              </StandardCard>

              <InteractiveCard>
                <InteractiveCorner>
                  <img src={CO_CORNER_DECO} alt="" />
                </InteractiveCorner>
                <CardHeaderRow>
                  <CardIconTitle>
                    <img
                      src={CO_INTERACTIVE_ICON}
                      alt=""
                      style={{ width: 33, height: 37 }}
                    />
                    <div
                      style={{
                        fontFamily: 'var(--font-publicSans), sans-serif',
                        fontSize: 18,
                        fontWeight: 700,
                        color: '#1b130d',
                      }}
                    >
                      Interactive State
                    </div>
                  </CardIconTitle>
                </CardHeaderRow>
                <p
                  style={{
                    fontFamily: 'var(--font-roboto), sans-serif',
                    fontSize: 14,
                    lineHeight: '20px',
                    color: '#9a6c4c',
                    margin: 0,
                  }}
                >
                  Hover state demonstrates elevation and subtle border color
                  shift.
                </p>
              </InteractiveCard>
            </CardsGrid>

            <FeaturedCard>
              <FeaturedCardBg>★</FeaturedCardBg>
              <FeaturedCardContent>
                <FeaturedCardTitle>Featured Container</FeaturedCardTitle>
                <FeaturedCardDesc>
                  Used for high-priority alerts or primary call-to-actions. Uses
                  solid primary color fill.
                </FeaturedCardDesc>
              </FeaturedCardContent>
              <FeaturedCardBtn>Action</FeaturedCardBtn>
            </FeaturedCard>
          </SectionContainer>

          {/* ── Buttons & Actions ── */}
          <SectionContainer id="buttons">
            <SectionHeader>
              <SectionTitle>Buttons &amp; Actions</SectionTitle>
              <SectionDesc>
                Buttons designed with tactile feedback, including bounce effects
                and clear hierarchy.
              </SectionDesc>
            </SectionHeader>

            <ButtonsDemoBox>
              <BtnDemoItem>
                <PrimaryBtnLg>
                  <img src={CO_BTN_ICON} alt="" />
                  Primary Action
                </PrimaryBtnLg>
                <MonoLabel>.bg-primary .bounce-hover</MonoLabel>
              </BtnDemoItem>

              <BtnDemoItem>
                <SecondaryBtnLg>Secondary</SecondaryBtnLg>
                <MonoLabel>Secondary / Outline</MonoLabel>
              </BtnDemoItem>

              <BtnDemoItem>
                <TextLinkBtn>
                  View Details
                  <img src={CO_LINK_ARROW} alt="" />
                </TextLinkBtn>
                <MonoLabel>Text Link</MonoLabel>
              </BtnDemoItem>

              <BtnDemoItem>
                <IconOnlyBtn>
                  <img src={CO_HEART_ICON} alt="" />
                </IconOnlyBtn>
                <MonoLabel>Icon Only</MonoLabel>
              </BtnDemoItem>

              <BtnDemoItem>
                <SegmentedControl>
                  <SegmentBtn $active>All</SegmentBtn>
                  <SegmentBtn>Active</SegmentBtn>
                </SegmentedControl>
                <MonoLabel>Segmented Control</MonoLabel>
              </BtnDemoItem>
            </ButtonsDemoBox>
          </SectionContainer>

          {/* ── State Management ── */}
          <SectionContainer id="state">
            <SectionHeader>
              <SectionTitle>State Management</SectionTitle>
              <SectionDesc>
                Visual language for task statuses using an earth-tone palette:
                Sage for success, Brown for pending, Orange for progress.
              </SectionDesc>
            </SectionHeader>

            <StateGrid>
              <StateCard
                $bg="rgba(243,236,231,0.2)"
                $border="rgba(154,108,76,0.3)"
                $dashed
              >
                <StateIconCircle $bg="#f3ece7">
                  <img src={CO_PENDING_ICON} alt="" />
                </StateIconCircle>
                <StateLabel $color="#9a6c4c">Pending / Empty</StateLabel>
                <StateBadge $bg="#f3ece7" $color="#9a6c4c">
                  0/5 Items
                </StateBadge>
              </StateCard>

              <StateCard $bg="#fff7ed" $border="rgba(236,109,19,0.2)">
                <StateIconCircle $bg="rgba(236,109,19,0.1)">
                  <img src={CO_INPROGRESS_ICON} alt="" />
                </StateIconCircle>
                <StateLabel $color="#ec6d13">In Progress</StateLabel>
                <StateProgressBar>
                  <StateProgressFill $w="50%" />
                </StateProgressBar>
              </StateCard>

              <StateCard $bg="#f0fdf4" $border="rgba(93,138,99,0.2)">
                <StateIconCircle $bg="#5d8a63" $shadow>
                  <img src={CO_COMPLETED_CHECK} alt="" />
                </StateIconCircle>
                <StateLabel $color="#5d8a63">Completed</StateLabel>
                <StateBadge $bg="rgba(93,138,99,0.1)" $color="#5d8a63">
                  Done
                </StateBadge>
                <CompletedDeco>
                  <img src={CO_COMPLETED_DECO} alt="" />
                </CompletedDeco>
              </StateCard>
            </StateGrid>

            <InputStatesCard>
              <InputStateLabel>Input States</InputStateLabel>
              <CheckboxRow>
                <CheckboxUnchecked />
                <CheckboxLabel>Unchecked Item</CheckboxLabel>
              </CheckboxRow>
              <CheckboxRow>
                <CheckboxChecked>
                  <img src={CO_CHECKBOX_CHK} alt="" />
                </CheckboxChecked>
                <CheckboxLabel $strike>Checked Item</CheckboxLabel>
              </CheckboxRow>
              <CheckboxRow $faded>
                <CheckboxDisabled />
                <CheckboxLabel style={{ color: '#9a6c4c' }}>
                  Disabled Item
                </CheckboxLabel>
              </CheckboxRow>
            </InputStatesCard>
          </SectionContainer>

          {/* ── Progress Indicators ── */}
          <SectionContainer id="progress">
            <SectionHeader>
              <SectionTitle>Progress Indicators</SectionTitle>
              <SectionDesc>
                Visualizing growth and completion with organic textures and
                animations.
              </SectionDesc>
            </SectionHeader>

            <ProgressTwoCol>
              <ProgressCol>
                <ProgressHeadLabel>Linear Bars</ProgressHeadLabel>

                <div>
                  <ProgressLabelRow>
                    <ProgressBarLabel>Total Completion</ProgressBarLabel>
                    <ProgressBarPct $color="#ec6d13">65%</ProgressBarPct>
                  </ProgressLabelRow>
                  <ProgressBarOuter>
                    <ProgressBarFill $w="65%" $color="#ec6d13" />
                  </ProgressBarOuter>
                </div>

                <div>
                  <ProgressLabelRow>
                    <ProgressBarLabel>Room Progress</ProgressBarLabel>
                    <ProgressBarPct $color="#8da399">
                      3/5 Bundles
                    </ProgressBarPct>
                  </ProgressLabelRow>
                  <ThinProgressBar>
                    <ThinProgressFill $w="60%" $color="#8da399" />
                  </ThinProgressBar>
                </div>
              </ProgressCol>

              <ProgressCol>
                <ProgressHeadLabel>Circular &amp; Radial</ProgressHeadLabel>
                <CircleRow>
                  <CircleProgress $size={80} $pct={75} $color="#ec6d13">
                    <CircleInner $size={64}>
                      <CircleLabel $size="lg">75%</CircleLabel>
                    </CircleInner>
                  </CircleProgress>
                  <CircleProgress $size={48} $pct={33} $color="#8da399">
                    <CircleInner $size={36}>
                      <CircleLabel $size="sm">1/3</CircleLabel>
                    </CircleInner>
                  </CircleProgress>
                </CircleRow>
              </ProgressCol>
            </ProgressTwoCol>
          </SectionContainer>
        </MainContent>
      </PageBody>

      <PageFooter>
        <p>
          Stardew Tracker Design System v2.0 · © 2024 Not affiliated with
          ConcernedApe.
        </p>
      </PageFooter>
    </PageWrapper>
  );
}
