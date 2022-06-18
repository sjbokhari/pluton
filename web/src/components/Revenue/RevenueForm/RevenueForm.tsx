import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
} from '@redwoodjs/forms'



const RevenueForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.revenue?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />
      
        <Label
          name="title"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Title
        </Label>
        
          <TextField
            name="title"
            defaultValue={props.revenue?.title}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="title" className="rw-field-error" />

        <Label
          name="customer"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Customer
        </Label>
        
          <TextField
            name="customer"
            defaultValue={props.revenue?.customer}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="customer" className="rw-field-error" />

        <Label
          name="seasson"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Seasson
        </Label>
        
          <TextField
            name="seasson"
            defaultValue={props.revenue?.seasson}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="seasson" className="rw-field-error" />

        <Label
          name="revenue"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Revenue
        </Label>
        
          <TextField
            name="revenue"
            defaultValue={props.revenue?.revenue}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsNumber: true, required: true }}
          />
        

        <FieldError name="revenue" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default RevenueForm
