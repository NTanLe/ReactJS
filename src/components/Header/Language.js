
import { NavDropdown } from "react-bootstrap"
import { useTranslation } from "react-i18next"

const Language = () => {
  const { t, i18n } = useTranslation()
  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng)
  }
  return (
    <>
      <NavDropdown title="Language" id="basic-nav-dropdown" className='language'>
        <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Tiếng Việt</NavDropdown.Item>
        <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>Tiếng Anh</NavDropdown.Item>
      </NavDropdown>
    </>
  )
}
export default Language