import { Divider, IDividerProps } from './components/common/atoms/Divider/Divider';
import { Heading, IHeadingProps } from './components/common/atoms/Heading/Heading';
import { ITextComponentProps, TextComponent } from './components/common/atoms/TextComponent/TextComponent';
import { ChapterItem, IChapterItemProps } from './components/features/Menu/molecules/ChapterItem/ChapterItem';
import { ChapterPart, IChapterPartProps } from './components/features/Menu/molecules/ChapterPart/ChapterPart';
import {
    MenuItemChapter,
    MenuItemChapterPropsInterface,
} from './components/features/Menu/molecules/MenuItemChapter/MenuItemChapter';
import {
    MenuItemLink,
    MenuItemLinkPropsInterface,
} from './components/features/Menu/molecules/MenuItemLink/MenuItemLink';
import {
    NavSidebarTitle,
    INavSidebarTitleProps,
} from './components/features/Menu/molecules/NavSidebarTitle/NavSidebarTitle';
import {
    ISidebarMenuItemProps,
    SidebarMenuItem,
} from './components/features/Menu/organisms/SidebarMenuItem/SidebarMenuItem';
import { TextLink } from './components/common/molecules/TextLink/TextLink';
import { ShortUserInfo, IShortUserInfoProps } from './components/common/molecules/ShortUserInfo/ShortUserInfo';
import { ProfileAvatar, IProfileAvatarProps } from './components/common/molecules/ProfileAvatar/ProfileAvatar';
import { Footer } from './components/common/molecules/Footer/Footer';
import { Menu, MenuPropsInterface } from './components/features/Menu/organisms/Menu/Menu';
import { MenuItem, MenuItemPropsInterface } from './components/features/Menu/organisms/MenuItem/MenuItem';
import { Header, IHeaderProps } from './components/common/organisms/Header/Header';
import { TemplatePage, TemplatePagePropsInterface } from './components/common/templates/TemplatePage/TemplatePage';
import {
    TemplateWorkdeskbioPage,
    ITemplateWorkdeskbioPageProps,
} from './components/common/templates/TemplatePortalPage/TemplateWorkdeskbioPage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';
import { ErrorWrapper } from './components/common/organisms/ErrorWrapper/ErrorWrapper';
import { WorkdeskbioServicesProvider } from './hocs/workdeskbio-service.provider';

import { MenuItemDto } from './models/menu/menu-item.dto';
import { UserWithPersonnelPositionsDto } from './models/api/clients/users/user-with-personnel-positions.dto';
import { TeambuildingUserBalanceDto } from './models/api/clients/users/teambuilding-user-balance.dto';
import { UserDemandShortDto } from './models/api/clients/users/user-demand.dto';
import { SearchingResultDto } from './models/api/clients/searching-result.dto';
import { SearchingByLlmResultDto } from './models/api/clients/searching-by-llm-result.dto';
import { IBaseComponentProps } from './interfaces/components/base-component-props.interface';
import { IPart, ISubsectionParts, ISubMenuItems, ISidebarMenu } from './interfaces/components/sidebar-menu.interface';
import { IWorkdeskbioClient } from './interfaces/api/client/workdeskbio-client.interface';
import { IServicesClients } from './interfaces/api/client/services-clients.interface';
import { FontFamilies } from './enums/font-families.enum';
import { FontWeights } from './enums/font-weights.enum';
import { HeadingTags } from './enums/heading-tags.enum';
import { TextTags } from './enums/text-tags.enum';
import { TextVariations } from './enums/text-variations.enum';
import { StatusCodes } from './enums/status-codes.enum';
import { LinkTargetTypes } from './enums/links-target-types.enum';
import { ProfileAvatarFrames } from './enums/profile-avatar-frames.enum';
import { ProfileAvatarSizes } from './enums/profile-avatar-sizes.enum';
import { UserRoles } from './enums/api/user-roles.enum';

import { ServicesProvider } from './utils/services.provider';
import {
    convertRestResponseToModel,
    convertRestResponseArrayToModel,
    checkResponseStatus,
} from './helpers/check-response-status.helper';
import { MINIMIZED_MENU_WIDTH_PX, EXPANDED_MENU_WIDTH_PX } from './global/constants/menu/sidebar-menu';

export {
    Divider,
    Heading,
    TextComponent,
    ChapterItem,
    ChapterPart,
    MenuItemChapter,
    MenuItemLink,
    NavSidebarTitle,
    SidebarMenuItem,
    ProfileAvatar,
    ShortUserInfo,
    TextLink,
    Menu,
    MenuItem,
    Header,
    Footer,
    ErrorWrapper,
    TemplatePage,
    TemplateWorkdeskbioPage,
    ErrorPage,
    WorkdeskbioServicesProvider,
    FontFamilies,
    FontWeights,
    HeadingTags,
    TextTags,
    TextVariations,
    StatusCodes,
    LinkTargetTypes,
    ProfileAvatarFrames,
    ProfileAvatarSizes,
    UserRoles,
    MenuItemDto,
    UserWithPersonnelPositionsDto,
    TeambuildingUserBalanceDto,
    UserDemandShortDto,
    SearchingResultDto,
    SearchingByLlmResultDto,
    ServicesProvider,
    convertRestResponseToModel,
    convertRestResponseArrayToModel,
    checkResponseStatus,
    MINIMIZED_MENU_WIDTH_PX,
    EXPANDED_MENU_WIDTH_PX,
};
export type {
    IBaseComponentProps,
    IPart,
    ISubsectionParts,
    ISubMenuItems,
    ISidebarMenu,
    IDividerProps,
    IHeadingProps,
    ITextComponentProps,
    IChapterItemProps,
    IChapterPartProps,
    IHeaderProps,
    IShortUserInfoProps,
    IProfileAvatarProps,
    MenuItemChapterPropsInterface,
    MenuItemLinkPropsInterface,
    INavSidebarTitleProps,
    ISidebarMenuItemProps,
    MenuPropsInterface,
    MenuItemPropsInterface,
    TemplatePagePropsInterface,
    ITemplateWorkdeskbioPageProps,
    IWorkdeskbioClient,
    IServicesClients,
};
