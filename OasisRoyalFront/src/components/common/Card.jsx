const Card = ({
  children,
  hover = false,
  shadow = true,
  padding = true,
  className = '',
  onClick
}) => {
  const baseStyles = 'bg-white rounded-lg transition-all duration-200'
  const hoverStyles = hover ? 'hover:shadow-xl hover:-translate-y-1 cursor-pointer' : ''
  const shadowStyles = shadow ? 'shadow-md' : ''
  const paddingStyles = padding ? 'p-4' : ''
  
  return (
    <div
      onClick={onClick}
      className={`${baseStyles} ${hoverStyles} ${shadowStyles} ${paddingStyles} ${className}`}
    >
      {children}
    </div>
  )
}

// Card subcomponents
Card.Image = ({ src, alt, className = '' }) => (
  <div className={`relative overflow-hidden rounded-t-lg ${className}`}>
    <img 
      src={src} 
      alt={alt} 
      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
      loading="lazy"
    />
  </div>
)

Card.Body = ({ children, className = '' }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
)

Card.Title = ({ children, className = '' }) => (
  <h3 className={`text-lg font-semibold text-gray-900 mb-2 ${className}`}>
    {children}
  </h3>
)

Card.Text = ({ children, className = '' }) => (
  <p className={`text-gray-600 text-sm ${className}`}>
    {children}
  </p>
)

Card.Footer = ({ children, className = '' }) => (
  <div className={`mt-4 pt-4 border-t border-gray-200 ${className}`}>
    {children}
  </div>
)

export default Card
