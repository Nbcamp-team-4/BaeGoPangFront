import { G, PRIMARY, AI_COLOR, PW, PH, STATUS_H, NAV_H, TOPBAR_H } from './constants';
import { Icon } from './icons';
import { useNavigate } from 'react-router-dom';

export function Btn({ children, variant = 'outline', size = 'md', onClick, style, disabled, full }) {
  const pad = size === 'sm' ? '5px 11px' : size === 'lg' ? '15px 0' : '10px 0';
  const fs = size === 'sm' ? '11px' : '13px';
  const bg =
    variant === 'primary'
      ? PRIMARY
      : variant === 'kakao'
        ? '#FEE500'
        : variant === 'ai'
          ? AI_COLOR
          : variant === 'ghost'
            ? 'transparent'
            : variant === 'danger'
              ? '#FFEBEE'
              : '#fff';
  const color =
    variant === 'primary' || variant === 'ai'
      ? '#fff'
      : variant === 'kakao'
        ? '#191919'
        : variant === 'ghost'
          ? G[600]
          : variant === 'danger'
            ? '#C62828'
            : G[800];
  const border = ['primary', 'kakao', 'ghost', 'ai'].includes(variant)
    ? 'none'
    : variant === 'danger'
      ? '1.5px solid #FFCDD2'
      : `1.5px solid ${G[300]}`;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        padding: pad,
        width: full ? '100%' : undefined,
        background: bg,
        color,
        border,
        borderRadius: '10px',
        fontSize: fs,
        fontWeight: 700,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'all .15s',
        fontFamily: 'inherit',
        ...style
      }}>
      {children}
    </button>
  );
}

// export function Input({ placeholder, style }) {
//   return (
//     <div style={{padding:"10px 13px",border:`1.5px solid ${G[300]}`,borderRadius:"10px",
//       color:G[400],fontSize:"13px",background:G[50],...style}}>
//       {placeholder}
//     </div>
//   );
// }
export function Input({ placeholder, style, ...props }) {
  return (
    <input
      placeholder={placeholder}
      style={{
        padding: '10px 13px',
        border: `1.5px solid ${G[300]}`,
        borderRadius: '10px',
        color: G[400],
        fontSize: '13px',
        background: G[50],
        width: '100%',
        outline: 'none',
        ...style
      }}
      {...props}
    />
  );
}

export function Chip({ label, active, onClick, color }) {
  const ac = color || PRIMARY;
  return (
    <div
      onClick={onClick}
      style={{
        padding: '6px 14px',
        borderRadius: '20px',
        fontSize: '12px',
        fontWeight: 600,
        background: active ? ac : G[100],
        color: active ? '#fff' : G[600],
        whiteSpace: 'nowrap',
        cursor: 'pointer',
        transition: 'all .15s',
        flexShrink: 0
      }}>
      {label}
    </div>
  );
}

export function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', margin: '4px 0' }}>
      <div style={{ flex: 1, height: '1px', background: G[200] }} />
      {label && <span style={{ fontSize: '11px', color: G[400], fontWeight: 500 }}>{label}</span>}
      <div style={{ flex: 1, height: '1px', background: G[200] }} />
    </div>
  );
}

export function Img({ w, h, label, radius, style }) {
  return (
    <div
      style={{
        width: w || '100%',
        height: h || '80px',
        flexShrink: 0,
        background: `repeating-linear-gradient(45deg,${G[100]},${G[100]} 8px,${G[200]} 8px,${G[200]} 16px)`,
        borderRadius: radius || '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: G[400],
        fontSize: '10px',
        fontWeight: 600,
        border: `1px solid ${G[200]}`,
        ...style
      }}>
      {label || '이미지'}
    </div>
  );
}

export function Stars({ v = 4.5, size = 12 }) {
  return (
    <span style={{ color: '#FFC107', fontSize: `${size}px` }}>
      {'★'.repeat(Math.floor(v))}
      {'☆'.repeat(5 - Math.floor(v))}
    </span>
  );
}

export function Badge({ children, color, bg }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 6px',
        borderRadius: '4px',
        fontSize: '10px',
        fontWeight: 700,
        background: bg || G[200],
        color: color || G[700]
      }}>
      {children}
    </span>
  );
}

export function Section({ title, children, action, actionFn }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <span style={{ fontSize: '14px', fontWeight: 800, color: G[900] }}>{title}</span>
        {action && (
          <span onClick={actionFn} style={{ fontSize: '12px', color: PRIMARY, fontWeight: 600, cursor: 'pointer' }}>
            {action}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

export function SearchBar({ placeholder }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '9px 13px',
        border: `1.5px solid ${G[300]}`,
        borderRadius: '10px',
        background: G[50]
      }}>
      {Icon.search()}
      <span style={{ fontSize: '13px', color: G[400] }}>{placeholder || '검색'}</span>
    </div>
  );
}

export function StatCard({ label, value, color, bg }) {
  return (
    <div
      style={{
        flex: 1,
        padding: '11px',
        background: bg || '#fff',
        border: `1.5px solid ${color || G[200]}22`,
        borderRadius: '11px',
        minWidth: 0
      }}>
      <div
        style={{
          fontSize: '11px',
          color: G[500],
          fontWeight: 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis'
        }}>
        {label}
      </div>
      <div style={{ fontSize: '18px', fontWeight: 900, color: color || G[900], marginTop: '2px' }}>{value}</div>
    </div>
  );
}

export function THead({ cols }) {
  return (
    <div
      style={{
        display: 'flex',
        padding: '8px 12px',
        background: G[50],
        borderBottom: `1.5px solid ${G[200]}`,
        gap: '6px'
      }}>
      {cols.map((c, i) => (
        <div
          key={i}
          style={{ flex: c.flex || 1, fontSize: '10px', color: G[500], fontWeight: 700, whiteSpace: 'nowrap' }}>
          {c.v}
        </div>
      ))}
      <div style={{ width: '56px', flexShrink: 0 }} />
    </div>
  );
}

export function TRow({ cols, actions, highlight }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 12px',
        borderBottom: `1px solid ${G[100]}`,
        background: highlight ? '#FFFDE7' : '#fff',
        gap: '6px'
      }}>
      {cols.map((c, i) => (
        <div
          key={i}
          style={{
            flex: c.flex || 1,
            fontSize: '11px',
            color: c.color || G[700],
            fontWeight: c.bold ? 700 : 400,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
          {c.v}
        </div>
      ))}
      {actions && <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>{actions}</div>}
    </div>
  );
}

export function Radio({ checked, onClick, children, style }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        padding: '11px 13px',
        border: `1.5px solid ${checked ? PRIMARY : G[300]}`,
        borderRadius: '10px',
        background: checked ? '#FFF3F0' : '#fff',
        cursor: 'pointer',
        transition: 'all .15s',
        ...style
      }}>
      <div
        style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          border: `2px solid ${checked ? PRIMARY : G[400]}`,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0
        }}>
        {checked && <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: PRIMARY }} />}
      </div>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  );
}

// ── 레이아웃 ───────────────────────────────────────────────

export function TopBar({ title, backTo, right }) {
  const navigate = useNavigate();
  const handleBack = () => {
    if (!backTo) return;
    const to = backTo.startsWith('/') ? backTo : `/${backTo}`;
    navigate(to);
  };
  return (
    <div
      style={{
        height: `${TOPBAR_H}px`,
        background: '#fff',
        borderBottom: `1px solid ${G[100]}`,
        display: 'flex',
        alignItems: 'center',
        padding: '0 12px',
        gap: '8px',
        flexShrink: 0
      }}>
      {backTo && (
        <button
          onClick={handleBack}
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            border: 'none',
            background: G[100],
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke={G[700]}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}
      <span style={{ fontSize: '15px', fontWeight: 800, color: G[900], flex: 1 }}>{title}</span>
      {right && right}
    </div>
  );
}

export function BottomNav({ active }) {
  const navigate = useNavigate();

  const C = (id) => (active === id ? (id === 'ai-recommend' ? '#6C3EE8' : PRIMARY) : G[500]);
  const items = [
    {
      id: 'home',
      icon: (c) => (
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      label: '홈'
    },
    {
      id: 'ai-recommend',
      icon: (c) => (
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
      label: 'AI추천'
    },
    {
      id: 'cart',
      icon: (c) => (
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      ),
      label: '장바구니'
    },
    {
      id: 'order-history',
      icon: (c) => (
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
        </svg>
      ),
      label: '주문내역'
    },
    {
      id: 'mypage',
      icon: (c) => (
        <svg
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke={c}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      ),
      label: '마이'
    }
  ];
  return (
    <div
      style={{
        height: `${NAV_H}px`,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '0 0 8px',
        borderTop: `1px solid ${G[200]}`,
        background: '#fff',
        flexShrink: 0
      }}>
      {items.map((n) => (
        <div
          key={n.id}
          onClick={() => navigate(`/customer/${n.id}`)}
          style={{
            textAlign: 'center',
            fontSize: '10px',
            color: C(n.id),
            fontWeight: active === n.id ? 700 : 400,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            flex: 1
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{n.icon(C(n.id))}</div>
          <span>{n.label}</span>
          {active === n.id && (
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: n.id === 'ai-recommend' ? '#6C3EE8' : PRIMARY
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

export function Phone({ children, navActive, noNav, noStatus }) {
  const innerH = PH - (noStatus ? 0 : STATUS_H) - (noNav ? 0 : NAV_H);
  return (
    <div
      style={{
        width: `${PW}px`,
        height: `${PH}px`,
        border: `3px solid ${G[800]}`,
        borderRadius: '44px',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 12px 48px rgba(0,0,0,0.18)',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
      {!noStatus && (
        <div
          style={{
            height: `${STATUS_H}px`,
            background: G[900],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 24px',
            fontSize: '12px',
            color: '#fff',
            fontWeight: 600,
            flexShrink: 0
          }}></div>
      )}
      <div
        style={{ height: `${innerH}px`, overflowY: 'auto', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        {children}
      </div>
      {!noNav && <BottomNav active={navActive} />}
    </div>
  );
}

/** 관리자 전용 셸 (파란 상태바 + 뒤로가기 TopBar) */
export function AdminShell({ title, go, back = 'admin', children, right }) {
  const navigate = useNavigate();
  const handleBack = () => {
    const to = back.startsWith('/') ? back : `/${back}`;
    navigate(to);
  };
  return (
    <Phone noNav>
      <div
        style={{
          height: `${STATUS_H}px`,
          background: '#1A237E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          fontSize: '12px',
          color: '#fff',
          fontWeight: 600,
          flexShrink: 0
        }}></div>
      <div
        style={{
          height: `${PH - STATUS_H}px`,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0
        }}>
        <div
          style={{
            height: `${TOPBAR_H}px`,
            background: '#1A237E',
            display: 'flex',
            alignItems: 'center',
            padding: '0 12px',
            gap: '8px',
            flexShrink: 0
          }}>
          <button
            onClick={handleBack}
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              border: 'none',
              background: 'rgba(255,255,255,0.15)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <span style={{ fontSize: '15px', fontWeight: 800, color: '#fff', flex: 1 }}>{title}</span>
          {right && right}
        </div>
        {children}
      </div>
    </Phone>
  );
}
