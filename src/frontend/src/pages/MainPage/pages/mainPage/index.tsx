import { FolderPlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import DropdownButton from "../../../../components/dropdownButtonComponent";
import IconComponent from "../../../../components/genericIconComponent";
import PageLayout from "../../../../components/pageLayout";
import SidebarNav from "../../../../components/sidebarComponent";
import { Button } from "../../../../components/ui/button";
import { CONSOLE_ERROR_MSG } from "../../../../constants/alerts_constants";
import {
  MY_COLLECTION_DESC,
  USER_PROJECTS_HEADER,
} from "../../../../constants/constants";
import FoldersModal from "../../../../modals/foldersModal";
import NewFlowModal from "../../../../modals/newFlowModal";
import useAlertStore from "../../../../stores/alertStore";
import useFlowsManagerStore from "../../../../stores/flowsManagerStore";
import { useFolderStore } from "../../../../stores/foldersStore";
import { downloadFlows } from "../../../../utils/reactflowUtils";

export default function HomePage(): JSX.Element {
  const uploadFlow = useFlowsManagerStore((state) => state.uploadFlow);
  const setCurrentFlowId = useFlowsManagerStore(
    (state) => state.setCurrentFlowId,
  );
  const uploadFlows = useFlowsManagerStore((state) => state.uploadFlows);
  const setSuccessData = useAlertStore((state) => state.setSuccessData);
  const setErrorData = useAlertStore((state) => state.setErrorData);
  const location = useLocation();
  const pathname = location.pathname;
  const [openModal, setOpenModal] = useState(false);
  const [openFolderModal, setOpenFolderModal] = useState(false);
  const is_component = pathname === "/components";
  const getFoldersApi = useFolderStore((state) => state.getFoldersApi);

  useEffect(() => {
    getFoldersApi();
  }, []);

  const dropdownOptions = [
    {
      name: "Import from JSON",
      onBtnClick: () => {
        uploadFlow({
          newProject: true,
          isComponent: is_component,
        })
          .then((id) => {
            setSuccessData({
              title: `${
                is_component ? "Component" : "Flow"
              } uploaded successfully`,
            });
            if (!is_component) navigate("/flow/" + id);
          })
          .catch((error) => {
            setErrorData({
              title: CONSOLE_ERROR_MSG,
              list: [error],
            });
          });
      },
    },
  ];
  const sidebarNavItems = [
    {
      title: "New Folder",
      icon: <FolderPlusIcon className="mx-[0.08rem] w-[1.1rem] stroke-[1.5]" />,
    },
  ];

  useEffect(() => {
    setCurrentFlowId("");
  }, [pathname]);

  const navigate = useNavigate();
  const folders = useFolderStore((state) => state.folders);
  const folderId = location?.state?.folderId;
  const folderName = folders.find((folder) => folder.id === folderId)?.name;
  const folderDescription = folders.find(
    (folder) => folder.id === folderId,
  )?.description;

  return (
    <PageLayout
      title={!folderId ? USER_PROJECTS_HEADER : folderName!}
      description={!folderId ? MY_COLLECTION_DESC : folderDescription!}
      button={
        <div className="flex gap-2">
          <Button
            variant="primary"
            onClick={() => {
              downloadFlows();
            }}
          >
            <IconComponent name="Download" className="main-page-nav-button" />
            Download Collection
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              uploadFlows();
            }}
          >
            <IconComponent name="Upload" className="main-page-nav-button" />
            Upload Collection
          </Button>
          <DropdownButton
            firstButtonName="New Project"
            onFirstBtnClick={() => setOpenModal(true)}
            options={dropdownOptions}
            plusButton={true}
            dropdownOptions={false}
          />
        </div>
      }
    >
      <div className="flex h-full w-full space-y-8 lg:flex-row lg:space-x-8 lg:space-y-0">
        <aside className="flex h-full flex-col space-y-6 lg:w-1/5">
          <SidebarNav
            handleOpenNewFolderModal={() => setOpenFolderModal(true)}
            items={sidebarNavItems}
            handleChangeFolder={(id: string) => {
              navigate(`flows/folder/${id}`, { state: { folderId: id } });
            }}
          />
        </aside>
        <div className="h-full w-full flex-1">
          <Outlet />
        </div>
      </div>
      <NewFlowModal open={openModal} setOpen={setOpenModal} />
      <FoldersModal open={openFolderModal} setOpen={setOpenFolderModal} />
    </PageLayout>
  );
}
