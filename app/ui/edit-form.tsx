import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  DropdownItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
} from '@nextui-org/react';
import {
  EllipsisHorizontalCircleIcon as OptionsIcon,
  PencilIcon,
  LockClosedIcon,
} from '@heroicons/react/24/solid';
import { updateVotingStage } from '@/lib/action';
import { useParams } from 'next/navigation';
import { useState } from 'react';
import {
  updatePotentialDestination,
  deletePotentialDestination,
} from '@/lib/action';

export default function EditForm({
  city,
  country,
  id,
}: {
  city: string;
  country: string;
  id: string;
}) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const params = useParams<{ trip_id: string }>();
  const tripId = params.trip_id;

  const [cityVal, setCityVal] = useState(city);
  function handleCityChange(e) {
    setCityVal(e.target.value);
  }

  const [countryVal, setCountryVal] = useState(country);
  function handleCountryChange(e) {
    setCountryVal(e.target.value);
  }

  function handleClick(dropdownItemKey: string) {
    if (dropdownItemKey === 'lock-in') {
      updateVotingStage(tripId, city, country);
    }
  }

  function handleSubmit(formData: FormData) {
    updatePotentialDestination(formData, id, tripId);
    onClose();
  }

  function handleDelete() {
    deletePotentialDestination(id, tripId);
    onClose();
  }

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            isIconOnly
            size="sm"
            className="bg-transparent"
            variant="solid"
            disableRipple
          >
            <OptionsIcon
              height={22}
              className="fill-light-grey -translate-x-[-7px]"
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Trip Actions"
          onAction={(key) => handleClick(key as string)}
        >
          <DropdownSection title={`${city}, ${country}`}>
            <DropdownItem
              key="edit"
              startContent={
                <PencilIcon height={15} className="fill-light-grey" />
              }
              textValue="Edit"
            >
              <Button onPress={onOpen}>Edit</Button>
            </DropdownItem>
            <DropdownItem
              key="lock-in"
              startContent={
                <LockClosedIcon height={15} className="fill-light-grey" />
              }
              textValue="Lock In"
            >
              <Button>Lock In</Button>
            </DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Destination
              </ModalHeader>
              <form action={handleSubmit}>
                <ModalBody>
                  <Input
                    autoFocus
                    label="City"
                    placeholder="Add city name"
                    variant="bordered"
                    defaultValue={cityVal}
                    onChange={handleCityChange}
                    name="city"
                  />
                  <Input
                    label="Country"
                    placeholder="Add country name"
                    variant="bordered"
                    defaultValue={countryVal}
                    onChange={handleCountryChange}
                    name="country"
                  />
                  <Input
                    label="New Image"
                    placeholder="Add new image URL"
                    variant="bordered"
                    name="url"
                  />
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={handleDelete}>
                    Delete
                  </Button>
                  <Button color="primary" type="submit">
                    Submit
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
